package com.vvh.vnua_test.dto.response;

public class ResponseError<T> extends ResponseData<T> {
    public ResponseError(Integer errorCode, String message) {
        super(errorCode, message);
    }
}