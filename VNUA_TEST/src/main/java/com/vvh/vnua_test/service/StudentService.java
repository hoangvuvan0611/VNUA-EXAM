package com.vvh.vnua_test.service;

import com.vvh.vnua_test.dto.model.StudentDTO;
import com.vvh.vnua_test.dto.model.StudentShowListDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentService {
    boolean createStudent(StudentDTO student);
    StudentDTO findStudentById(String id);
    List<StudentShowListDTO> findAll(Pageable pageable);
    boolean isExistById(String id);
}
