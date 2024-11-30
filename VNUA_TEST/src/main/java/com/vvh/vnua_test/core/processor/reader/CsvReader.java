package com.vvh.vnua_test.core.processor.reader;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import com.vvh.vnua_test.common.constant.consts.MyConst;
import com.vvh.vnua_test.core.mapper.FileMapper;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.CompletionException;
import java.util.concurrent.TimeoutException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CsvReader implements FileReader {

    @Value("${size.chunk}")
    private Integer chunkSize;

    private final FileMapper fileMapper;

    private final QuestionRepository questionRepository;

    @Override
    public BatchInsertResult readFile(MultipartFile file, String objectType) throws IOException {

        // Thread-safe list không cần synchronized
        // CopyOnWriteArrayList so voi synchronizedList:
        // Hieu qua hon synchronized trong truong hop nhieu thread ghi du lieu
        // Khong block khi them phan tu, Thread-safe mac ding giam overhead viec lock/unlock
        List<?> result = new CopyOnWriteArrayList<>();

        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()));
             ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {

            String[] headers = csvReader.readNext();
            if (headers == null) {
                throw new LogicException("RF00001", "file.header.not.found");
            }

            List<CompletableFuture<Void>> futures = new ArrayList<>();
            List<String[]> rowsBuffer = new ArrayList<>(chunkSize);

            String[] row;
            while ((row = csvReader.readNext()) != null) {
                rowsBuffer.add(row.clone()); // Clone để tránh tham chiếu đến cùng một mảng

                // Kiểm tra nếu đủ kích thước chunk hoặc là chunk cuối
                if (rowsBuffer.size() >= chunkSize || !csvReader.verifyReader()) {

                    // Chunk: list chua row
                    List<String[]> chunk = new ArrayList<>(rowsBuffer);
                    rowsBuffer.clear();

                    // Xử lý chunk trong virtual thread
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        try {
                            processChunk(headers, chunk, result, objectType);
                        } catch (Exception e) {
                            throw new CompletionException("Error processing chunk", e);
                        }
                    }, executor);

                    futures.add(future);
                }
            }

            // Xử lý chunk cuối cùng nếu còn
            if (!rowsBuffer.isEmpty()) {
                List<String[]> lastChunk = new ArrayList<>(rowsBuffer);
                CompletableFuture<Void> future = CompletableFuture.runAsync(() ->
                        processChunk(headers, lastChunk, result, objectType), executor);
                futures.add(future);
            }

            // Đợi tất cả các futures hoàn thành
            try {
                CompletableFuture<Void> allOf = CompletableFuture.allOf(
                        futures.toArray(new CompletableFuture[0])
                );
                allOf.get(30, TimeUnit.MINUTES); // Timeout sau 30 phút
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IOException("Processing was interrupted", e);
            } catch (ExecutionException e) {
                throw new IOException("Error processing CSV file", e.getCause());
            } catch (TimeoutException e) {
                throw new IOException("Processing timed out after 30 minutes", e);
            }
        } catch (CsvValidationException e) {
            throw new IOException("Invalid CSV format", e);
        }

        return null;
    }

    private void processChunk(String[] headers, List<String[]> chunk, List<?> result, String objectType) {
        for (String[] line : chunk) {
            try {
                if (MyConst.OBJECT_TYPE_STUDENT.equals(objectType)) {
                    fileMapper.mapperStudentFile(headers, line);
                } else {
                    fileMapper.mapperQuestionAnswerFile(headers, line);
                }
            } catch (Exception e) {
                // Log error và tiếp tục xử lý các dòng khác
                log.error("Error processing line: {}", String.join(",", line), e);
            }
        }
    }

    @Override
    public BatchInsertResult readFileFromPath(String path) throws IOException {
        List<?> result = new ArrayList<>();
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(new FileInputStream(path)))) {
            String[] headers = csvReader.readNext();
            String[] row;
            while ((row = csvReader.readNext()) != null) {
                fileMapper.mapperQuestionAnswerFile(headers, row);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
