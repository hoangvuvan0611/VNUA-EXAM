package com.vvh.vnua_test.repository.custom;

import com.vvh.vnua_test.dto.model.QuestionAnswerDTO;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import com.vvh.vnua_test.entity.Student;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface CustomQuestionRepository {
    void batchInsertQuestionAnswer(List<QuestionAnswerDTO> questionList, String createUser, BatchInsertResult batchInsertResult);
    void batchInsertStudent(List<Student> studentList, String createUser, BatchInsertResult batchInsertResult);
    Map<Long, Boolean> executeBatchInsertQuestion(List<QuestionAnswerDTO> questionList, String createUser);
    Map<Long, Set<String>> executeBatchInsertAnswer(List<QuestionAnswerDTO> answerList, String createUser);
    void executeBatchStudent(List<Student> studentList, String createUser, BatchInsertResult batchInsertResult);
}
