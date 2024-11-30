package com.vvh.vnua_test.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BatchInsertResult {
    private int successCount = 0;
    private int failedCount = 0;
    private List<ErrorDetail> errorDetailList = new ArrayList<>();

    public void addSuccessCount(int successCount) {
        this.successCount += successCount;
    }

    public void addFailedCount(int failedCount) {
        this.failedCount += failedCount;
    }

    public void addEntityError(Object entity, String description) {
        this.errorDetailList.add(new ErrorDetail(entity, description));
    }
}
