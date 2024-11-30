package com.vvh.vnua_test.dto.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDTO {
    private Long id;
    private String departmentName;
    private String departmentCode;
    private String description;
    private Long facultiesId;
    private Timestamp createdAt;
    private String createdUser;
    private Timestamp updatedAt;
    private String updatedUser;
}
