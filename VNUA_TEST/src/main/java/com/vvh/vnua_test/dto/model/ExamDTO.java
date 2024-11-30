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
public class ExamDTO {
    private Long id;
    private String title;
    private Long duration;
    private Long subjectId;
    private String data;
    private Timestamp createAt;
    private String createUser;
    private Timestamp updatedAt;
    private String updateUser;
}
