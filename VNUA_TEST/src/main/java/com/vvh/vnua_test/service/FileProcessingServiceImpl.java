package com.vvh.vnua_test.service;

import com.vvh.vnua_test.core.factory.FileProcessorFactory;
import com.vvh.vnua_test.core.factory.FileProcessorFactoryProvider;
import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import com.vvh.vnua_test.utils.DataUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.vvh.vnua_test.common.constant.consts.MyConst;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileProcessingServiceImpl implements FileProcessingService {

    private final FileProcessorFactoryProvider fileProcessorFactoryProvider;

    @Override
    public BatchInsertResult readFileQuestion(MultipartFile file) throws IOException {
        FileReader<?> reader = getFileReader(file);
        return reader.readFile(file, MyConst.OBJECT_TYPE_QUESTION);
    }

    @Override
    public BatchInsertResult readFileStudent(MultipartFile file) throws IOException {
        FileReader<?> reader = getFileReader(file);
        return reader.readFile(file, MyConst.OBJECT_TYPE_STUDENT);
    }

    @Override
    public void readFileWithPath(String path) {


    }

    @Override
    public String getFileType(MultipartFile file) {
        if (DataUtils.isNullObject(file)) return null;
        return switch (file.getContentType()) {
            case MyConst.FILE_TYPE_CSV_ORIGINAL -> MyConst.FILE_TYPE_CSV;
            case MyConst.FILE_TYPE_EXCEL_ORIGINAL, MyConst.FILE_TYPE_EXCEL_ORIGINAL_NEW -> MyConst.FILE_TYPE_EXCEL;
            case MyConst.FILE_TYPE_JSON_ORIGINAL -> MyConst.FILE_TYPE_JSON;
            case null, default -> null;
        };
    }

    @Override
    public FileReader<?> getFileReader(MultipartFile file) {
        String fileType = getFileType(file);
        FileProcessorFactory factory = fileProcessorFactoryProvider.getFactory(fileType);
        return factory.createReader();
    }
}
