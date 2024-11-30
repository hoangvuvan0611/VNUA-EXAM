package com.vvh.vnua_test.repository;

import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.repository.dsl.StudentRepositoryDSL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>, StudentRepositoryDSL {
}
