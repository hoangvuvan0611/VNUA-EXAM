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
public class AnswerDTO {
    private Long id;
    private String content;
    private Long questionId;
    private boolean isActive;
    private Timestamp createdAt;
    private String createdUser;
    private Timestamp updatedAt;
    private String updatedUser;
}
