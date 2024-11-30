package com.vvh.vnua_test.core.factory;

import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.core.processor.validator.FileValidator;
import com.vvh.vnua_test.core.processor.writer.FileWriter;

public interface FileProcessorFactory {
    FileReader<?> createReader();
    FileWriter<?> createWriter();
    FileValidator createValidator();
    String getFileType();
}
