package com.vvh.vnua_test.dto.model;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private String id;
    private String fullName;
    private Date dateOfBirth;
    private String gender;
    private Timestamp createdAt;
    private String createdUser;
    private Timestamp updatedAt;
    private String updatedUser;
    private Timestamp loggedAt;
}
