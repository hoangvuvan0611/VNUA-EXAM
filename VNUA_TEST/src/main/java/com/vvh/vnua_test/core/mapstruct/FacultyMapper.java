package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.FacultyDTO;
import com.vvh.vnua_test.entity.Faculty;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FacultyMapper {
    FacultyMapper INSTANCE = Mappers.getMapper(FacultyMapper.class);
    FacultyDTO facultyToFacultyDTO(Faculty faculty);
    Faculty facultyDTOToFaculty(FacultyDTO facultyDTO);
}
