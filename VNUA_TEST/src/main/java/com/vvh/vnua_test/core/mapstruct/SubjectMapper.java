package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.SubjectDTO;
import com.vvh.vnua_test.entity.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SubjectMapper {
    SubjectMapper INSTANCE = Mappers.getMapper(SubjectMapper.class);
    SubjectDTO subjectToSubjectDTO(Subject subject);
    Subject subjectDTOToSubject(SubjectDTO subjectDTO);
}
