package com.vvh.vnua_test.dto.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserGetAllDTO {
    private String username;
    private String fullName;
    private boolean isActivated;
    private Timestamp createdAt;
    private String updatedUserId;
    private Timestamp loggedAt;
}
