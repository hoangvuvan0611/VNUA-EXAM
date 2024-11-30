package com.vvh.vnua_test.repository;

import com.vvh.vnua_test.entity.Question;
import com.vvh.vnua_test.repository.custom.CustomQuestionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>, CustomQuestionRepository {
}
