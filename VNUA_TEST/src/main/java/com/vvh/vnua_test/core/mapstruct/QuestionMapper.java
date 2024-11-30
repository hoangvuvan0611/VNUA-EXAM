package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.QuestionDTO;
import com.vvh.vnua_test.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionMapper {
    QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);
    QuestionDTO questionToQuestionDTO(Question question);
    Question questionDTOToQuestion(QuestionDTO questionDTO);
}
