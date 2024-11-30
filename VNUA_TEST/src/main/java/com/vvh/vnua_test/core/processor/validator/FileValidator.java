package com.vvh.vnua_test.core.processor.validator;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileValidator {
    boolean validate(MultipartFile file);
    List<String> getErrors();
}
