package com.vvh.vnua_test.core.processor.validator;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExcelValidator implements FileValidator {

    private final List<String> errors = new ArrayList<>();

    @Override
    public boolean validate(MultipartFile file) {
        errors.clear();
        String contentType = file.getContentType();
        if (!"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(contentType)) {
            errors.add("Invalid file type. Expected: Excel file (.xlsx)");
            return false;
        }
        return true;
    }

    @Override
    public List<String> getErrors() {
        return List.of();
    }
}
