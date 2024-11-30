package com.vvh.vnua_test.core.mapper;

import com.vvh.vnua_test.dto.model.QuestionAnswerDTO;
import com.vvh.vnua_test.entity.Student;

public interface FileMapper {
    QuestionAnswerDTO mapperQuestionAnswerFile(String[] headers, String[] row);
    Student mapperStudentFile(String[] headers, String[] row);
}
