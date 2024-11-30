package com.vvh.vnua_test.core.processor.reader;

import com.vvh.vnua_test.dto.response.BatchInsertResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileReader<T> {
    BatchInsertResult readFile(MultipartFile file, String objectType) throws IOException;
    BatchInsertResult readFileFromPath(String path) throws IOException;
}
