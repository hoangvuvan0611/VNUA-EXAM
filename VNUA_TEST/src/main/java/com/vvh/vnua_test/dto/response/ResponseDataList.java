package com.vvh.vnua_test.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ResponseDataList<T> extends ResponseData<T>{
    private final int total;

    public ResponseDataList(String message , List<T> dataList) {
        super(message, dataList);
        this.total = dataList.size();
    }
}
