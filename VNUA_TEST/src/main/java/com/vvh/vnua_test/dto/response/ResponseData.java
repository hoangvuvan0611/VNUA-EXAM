package com.vvh.vnua_test.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.vvh.vnua_test.config.lang.Translator;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class ResponseData<T> {
    private final boolean success;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final Integer errorCode;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T data;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final List<T> dataList;

    // Cho cac response thanh cong
    public ResponseData(String message, T data) {
        this.success = true;
        this.errorCode = HttpStatus.OK.value();
        this.message = Translator.toLocale(message);
        dataList = null;
        this.data = data;
    }

    // Response tra ve loi
    public ResponseData(Integer errorCode, String message) {
        this.success = false;
        this.errorCode = errorCode;
        this.message = message;
        this.data = null;
        dataList = null;
    }

    public ResponseData(String message, List<T> dataList) {
        this.success = true;
        this.errorCode = HttpStatus.OK.value();
        this.message = Translator.toLocale(message);
        this.data = null;
        this.dataList = dataList;
    }
}