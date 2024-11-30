package com.vvh.vnua_test.service;

import com.vvh.vnua_test.core.mapstruct.StudentMapper;
import com.vvh.vnua_test.dto.model.StudentDTO;
import com.vvh.vnua_test.dto.model.StudentShowListDTO;
import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.StudentRepository;
import com.vvh.vnua_test.utils.DataUtils;
import com.vvh.vnua_test.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean createStudent(StudentDTO student) throws LogicException {
        if (isExistById(student.getId())) throw new LogicException("CS00001","student.code.already.exist");
        Student newStudent = Student.builder()
                .id(student.getId())
                .fullName(student.getFullName())
                .gender(student.getGender())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .createdUser(SecurityUtil.currentUserName())
                .dateOfBirth(student.getDateOfBirth())
                .build();

        Student result = studentRepository.save(newStudent);
        studentRepository.flush();
        return !DataUtils.isEmptyOrNull(result);
    }

    @Override
    public StudentDTO findStudentById(String id) {
        Student student = studentRepository.findById(id).orElse(null);
        if (DataUtils.isNullObject(student)) throw new LogicException("FSBI00001","student.find.by.code.not.found");
        return StudentMapper.INSTANCE.studentToStudentDTO(student);
    }

    @Override
    public List<StudentShowListDTO> findAll(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(StudentMapper.INSTANCE::studentToStudentShowListDTO).stream().toList();
    }

    @Override
    public boolean isExistById(String id) {
        return studentRepository.existsById(id);
    }
}
