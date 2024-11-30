package com.vvh.vnua_test.service;

import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileProcessingService {
    BatchInsertResult readFileQuestion(MultipartFile file) throws IOException;
    BatchInsertResult readFileStudent(MultipartFile file) throws IOException;
    void readFileWithPath(String path);
    String getFileType(MultipartFile file);
    FileReader<?> getFileReader(MultipartFile file);
}
