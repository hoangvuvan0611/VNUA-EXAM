package com.vvh.vnua_test.exception;

import com.vvh.vnua_test.config.lang.Translator;
import lombok.Getter;

@Getter
public class LogicException extends RuntimeException {
    
    private final String errorCode;

    public LogicException(String errorCode, String message) {
        super(Translator.toLocale(message));
        this.errorCode = errorCode;
    }
}
