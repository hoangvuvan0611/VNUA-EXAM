package com.vvh.vnua_test.core.factory;

import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.core.processor.validator.FileValidator;
import com.vvh.vnua_test.core.processor.writer.FileWriter;
import org.springframework.stereotype.Component;

@Component
public class JsonProcessorFactory implements FileProcessorFactory {

    @Override
    public FileReader<?> createReader() {
        return null;
    }

    @Override
    public FileWriter<?> createWriter() {
        return null;
    }

    @Override
    public FileValidator createValidator() {
        return null;
    }

    @Override
    public String getFileType() {
        return "";
    }
}
