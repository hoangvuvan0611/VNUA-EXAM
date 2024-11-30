package com.vvh.vnua_test.dto.model;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Long id;
    private String content;
    private String correctAnswer;
    private String questionType;
    private String subjectId;
    private String chapterIndex;
    private boolean isActive;
    private Timestamp createdAt;
    private String createUser;
    private Timestamp updatedAt;
    private String updatedUser;
}
