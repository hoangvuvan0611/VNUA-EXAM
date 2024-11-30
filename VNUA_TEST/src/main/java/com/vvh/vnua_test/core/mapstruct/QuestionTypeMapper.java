package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.QuestionTypeDTO;
import com.vvh.vnua_test.entity.QuestionType;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionTypeMapper {
    QuestionTypeMapper INSTANCE = Mappers.getMapper(QuestionTypeMapper.class);
    QuestionType questionTypeToQuestionType(QuestionTypeDTO questionTypeDTO);
    QuestionTypeDTO questionTypeToQuestionTypeDTO(QuestionType questionType);
}
