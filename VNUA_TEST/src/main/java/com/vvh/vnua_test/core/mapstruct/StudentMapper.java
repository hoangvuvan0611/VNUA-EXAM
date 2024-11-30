package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.StudentDTO;
import com.vvh.vnua_test.dto.model.StudentShowListDTO;
import com.vvh.vnua_test.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StudentMapper {
    public StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);
    StudentDTO studentToStudentDTO(Student student);
    Student studentDTOToStudent(StudentDTO studentDTO);
    StudentShowListDTO studentToStudentShowListDTO(Student student);
}
