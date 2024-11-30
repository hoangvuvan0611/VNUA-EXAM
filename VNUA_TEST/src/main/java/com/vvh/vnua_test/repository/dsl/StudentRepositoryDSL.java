package com.vvh.vnua_test.repository.dsl;

import com.vvh.vnua_test.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentRepositoryDSL {
    Page<Student> findAll(Pageable pageable);
}
