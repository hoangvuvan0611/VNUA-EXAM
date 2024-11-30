package com.vvh.vnua_test.core.processor.validator;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class CsvValidator implements FileValidator {

    @Override
    public boolean validate(MultipartFile file) {
        return false;
    }

    @Override
    public List<String> getErrors() {
        return List.of();
    }
}
