package com.vvh.vnua_test.core.processor.reader;

import com.vvh.vnua_test.common.constant.consts.MyConst;
import com.vvh.vnua_test.config.lang.Translator;
import com.vvh.vnua_test.core.mapper.FileMapper;
import com.vvh.vnua_test.dto.model.QuestionAnswerDTO;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.QuestionRepository;
import com.vvh.vnua_test.utils.DataUtils;
import com.vvh.vnua_test.utils.SecurityUtil;
import com.vvh.vnua_test.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletionException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.ExecutionException;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExcelReader<T> implements FileReader<T> {

    @Value("${size.chunk}")
    private Integer chunkSize;

    private final FileMapper fileMapper;

    private final QuestionRepository questionRepository;

    String currentUser = SecurityUtil.currentUserName();

    @Override
    public BatchInsertResult readFile(MultipartFile file, String objectType) throws IOException {
        BatchInsertResult batchInsertResult = new BatchInsertResult();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream());
             ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {

            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);

            if (headerRow == null) {
                throw new LogicException("RF00001", "file.header.not.found");
            }

            String[] headers = extractHeaders(headerRow);
            int totalRows = sheet.getLastRowNum();
            List<CompletableFuture<Void>> futures = new ArrayList<>();

            // Xử lý từng chunk
            for (int startRow = 1; startRow <= totalRows; startRow += chunkSize) {
                int endRow = Math.min(startRow + chunkSize - 1, totalRows);

                // Capture dữ liệu cho chunk hiện tại
                List<String[]> chunk = extractChunkData(sheet, startRow, endRow);

                CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                    try {
                        processChunk(headers, chunk, batchInsertResult, objectType);
                    } catch (Exception e) {
                        throw new CompletionException("Error processing chunk", e);
                    }
                }, executor);

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
                log.error("Error processing Excel file: {}", e.getMessage(), e);
                throw new IOException("Error processing Excel file", e.getCause());
            } catch (TimeoutException e) {
                throw new IOException("Processing timed out after 30 minutes", e);
            }
        }
        return batchInsertResult;
    }

    private String[] extractHeaders(Row headerRow) {
        int lastCell = headerRow.getLastCellNum();
        String[] headers = new String[lastCell];

        for (int i = 0; i < lastCell; i++) {
            Cell cell = headerRow.getCell(i);
            headers[i] = cell != null ? getCellValueAsString(cell).trim() : "";
        }

        // Trong mot so truong hop column dau cua file excel chua BOM lam cho header co cac ky tu khong mong muon
        headers[0] = headers[0].startsWith("\uFEFF") ? headers[0].substring(1) : headers[0];
        return headers;
    }

    private List<String[]> extractChunkData(Sheet sheet, int startRow, int endRow) {
        List<String[]> chunk = new ArrayList<>();
        int lastColumn = sheet.getRow(0).getLastCellNum();

        for (int rowNum = startRow; rowNum <= endRow; rowNum++) {
            Row row = sheet.getRow(rowNum);
            if (row != null) {
                String[] rowData = new String[lastColumn];
                for (int colNum = 0; colNum < lastColumn; colNum++) {
                    Cell cell = row.getCell(colNum);
                    rowData[colNum] = cell != null ? getCellValueAsString(cell).trim() : "";
                }
                chunk.add(rowData);
            }
        }

        return chunk;
    }

    private void processChunk(String[] headers, List<String[]> chunk, BatchInsertResult batchInsertResult, String objectType) {
        if (MyConst.OBJECT_TYPE_STUDENT.equals(objectType)) {
            insertChunkStudent(headers, chunk, batchInsertResult);
        } else {
            insertChunkQuestionAnswers(headers, chunk, batchInsertResult);
        }
    }

    private void insertChunkQuestionAnswers(String[] headers, List<String[]> chunk, BatchInsertResult batchInsertResult) {
        List<QuestionAnswerDTO> questionAnswerDTOList = new ArrayList<>();
        for (String[] line : chunk) {
            try {
                QuestionAnswerDTO questionAnswerDTO = fileMapper.mapperQuestionAnswerFile(headers, line);
                if (DataUtils.isNullObject(questionAnswerDTO)) continue;

                questionAnswerDTOList.add(questionAnswerDTO);
            } catch (Exception e) {
                log.error("Error processing line: {}", String.join(",", line), e);
                batchInsertResult.addFailedCount(1);
                batchInsertResult.addEntityError(line[2], Translator.toLocale("file.read.row.failed"));
            }
        }

        questionRepository.batchInsertQuestionAnswer(questionAnswerDTOList, currentUser, batchInsertResult);
    }

    private void insertChunkStudent(String[] headers, List<String[]> chunk, BatchInsertResult batchInsertResult) {
        List<Student> studentDTOList = new ArrayList<>();
        for (String[] line : chunk) {
            try {
                if (StringUtils.isNullOrEmpty(line[0])
                        && StringUtils.isNullOrEmpty(line[1])
                        && StringUtils.isNullOrEmpty(line[2])) continue;
                Student studentDTO = fileMapper.mapperStudentFile(headers, line);
                studentDTOList.add(studentDTO);
            } catch (Exception e) {
                log.error("Error processing line: {}", String.join(",", line), e);
                batchInsertResult.addFailedCount(1);
                batchInsertResult.addEntityError(line[2], e.getMessage());
            }
        }

        questionRepository.batchInsertStudent(studentDTOList, currentUser, batchInsertResult);
    }

    private String getCellValueAsString(Cell cell) {
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    yield cell.getLocalDateTimeCellValue().toString();
                }
                yield String.valueOf(cell.getNumericCellValue());
            }
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> {
                try {
                    yield cell.getStringCellValue();
                } catch (IllegalStateException e) {
                    yield String.valueOf(cell.getNumericCellValue());
                }
            }
            default -> "";
        };
    }

    @Override
    public BatchInsertResult readFileFromPath(String path) throws IOException {
        List<T> result = new ArrayList<>();
        try (FileInputStream fis = new FileInputStream(path);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);

            if (headerRow == null) {
                throw new LogicException("RF00001", "file.header.not.found");
            }

            String[] headers = extractHeaders(headerRow);
            int totalRows = sheet.getLastRowNum();

            for (int rowNum = 1; rowNum <= totalRows; rowNum++) {
                Row row = sheet.getRow(rowNum);
                if (row != null) {
                    String[] rowData = new String[headers.length];
                    for (int colNum = 0; colNum < headers.length; colNum++) {
                        Cell cell = row.getCell(colNum);
                        rowData[colNum] = cell != null ? getCellValueAsString(cell) : "";
                    }
                    fileMapper.mapperQuestionAnswerFile(headers, rowData);
                }
            }
        }
        return null;
    }
}
