package com.vvh.vnua_test.dto.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    private String identityId;
    private String username;
    private String fullName;
    private Date dateOfBirth;
    private String phoneNumber;
    private String gender;
    private String email;
    private boolean isStudent;
    private Timestamp createdAt;
    private String createdUserId;
    private Timestamp updatedAt;
    private String updatedUserId;
    private Timestamp loggedAt;
    private boolean isActivated;
}
