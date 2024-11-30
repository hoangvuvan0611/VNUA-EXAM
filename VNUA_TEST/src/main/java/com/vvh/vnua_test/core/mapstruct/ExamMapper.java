package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.ExamDTO;
import com.vvh.vnua_test.entity.Exam;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ExamMapper {
    ExamMapper INSTANCE = Mappers.getMapper(ExamMapper.class);
    ExamDTO examToExamDTO(Exam exam);
    Exam examDTOToExam(ExamDTO examDTO);
}
