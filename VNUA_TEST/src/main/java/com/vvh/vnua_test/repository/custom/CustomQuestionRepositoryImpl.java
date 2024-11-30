package com.vvh.vnua_test.repository.custom;

import com.vvh.vnua_test.config.lang.Translator;
import com.vvh.vnua_test.dto.model.QuestionAnswerDTO;
import com.vvh.vnua_test.dto.response.BatchInsertResult;
import com.vvh.vnua_test.entity.Answer;
import com.vvh.vnua_test.entity.Question;
import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.utils.DataUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.HashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomQuestionRepositoryImpl implements CustomQuestionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void batchInsertQuestionAnswer(List<QuestionAnswerDTO> questionList, String createUser, BatchInsertResult batchInsertResult) {
        try {
            // Thuc hien insert questions va theo doi ket qua
            Map<Long, Boolean> questionInsertResults = executeBatchInsertQuestion(questionList, createUser);

            // Lay danh sach cac answer cho cac question da insert thanh cong
            List<QuestionAnswerDTO> answerOfSuccessfulQuestions = questionList.stream()
                    .filter(question -> questionInsertResults.get(question.getQuestion().getId())).toList();

            if (DataUtils.isEmptyOrNull(answerOfSuccessfulQuestions)) return;
            Map<Long, Set<String>> answerInsertResults = executeBatchInsertAnswer(answerOfSuccessfulQuestions, createUser);
            updateBatchInsertQuestionAnswerResult(batchInsertResult, questionList, questionInsertResults, answerInsertResults);
        } catch (Exception e) {
            log.error("Error processing insert {}", e.getMessage(), e);
            throw new LogicException("BIQ00001", "db.insert.batch.question.error");
        }
    }

    @Override
    public void batchInsertStudent(List<Student> studentList, String createUser, BatchInsertResult batchInsertResult) {
        executeBatchStudent(studentList, createUser, batchInsertResult);
    }

    @Override
    public Map<Long, Boolean> executeBatchInsertQuestion(List<QuestionAnswerDTO> questionList, String createUser) {
        String sql = "INSERT INTO QUESTIONS (ID, CONTENT, CORRECT_ANSWER, QUESTION_TYPE, SUBJECT_ID, CHAPTER_INDEX, IS_ACTIVE, CREATED_AT, CREATED_USER) " +
                " VALUES (?,?,?,?,?,?,?,?,?); ";

        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        Map<Long, Boolean> results = new HashMap<>();
        int[] batchResults = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Question question = questionList.get(i).getQuestion();
                // Insert question
                ps.setLong(1, question.getId());
                ps.setString(2, question.getContent());
                ps.setString(3, question.getCorrectAnswer());
                ps.setString(4, question.getQuestionType());
                ps.setString(5, question.getSubjectId());
                ps.setString(6, question.getChapterIndex());
                ps.setBoolean(7, true);
                ps.setTimestamp(8, currentTime);
                ps.setString(9, question.getCreateUser());
            }

            @Override
            public int getBatchSize() {
                return questionList.size();
            }
        });

        // Ghi nhan ket qua insert cho tung question
        for (int i = 0; i < batchResults.length; i++) {
            Question question = questionList.get(i).getQuestion();
            results.put(question.getId(), batchResults[i] >= 0);
        }
        return results;
    }

    @Override
    public Map<Long, Set<String>> executeBatchInsertAnswer(List<QuestionAnswerDTO> successfulQuestionList, String createUser) {
        List<Answer> answerList = successfulQuestionList.stream()
                .flatMap(questionAnswerDTO -> questionAnswerDTO.getAnswers().stream()).toList();

        final String sql = "INSERT INTO ANSWERS (ID, CONTENT, QUESTION_ID, IS_ACTIVE, CREATED_AT, CREATED_USER) VALUES (?,?,?,?,?,?)";
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        Map<Long, Set<String>> results = new HashMap<>();
        int[] batchResults = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                // Set param for insert answer
                ps.setLong(1, answerList.get(i).getId());
                ps.setString(2, answerList.get(i).getContent());
                ps.setLong(3, answerList.get(i).getQuestionId());
                ps.setBoolean(4, answerList.get(i).isActive());
                ps.setTimestamp(5,currentTime);
                ps.setString(6, createUser);
            }

            @Override
            public int getBatchSize() {
                return answerList.size();
            }
        });

        for (int i = 0; i < batchResults.length; i++) {
            if (batchResults[i] >= 0) continue;
            results.computeIfAbsent(answerList.get(i).getQuestionId(), k -> new HashSet<>())
                    .add(answerList.get(i).getContent());
        }

        return results;
    }

    @Override
    public void executeBatchStudent(List<Student> studentList, String createUser, BatchInsertResult batchInsertResult) {
        String sql = " INSERT INTO STUDENTS (ID, FULL_NAME, PASSWORD, GENDER, DATE_OF_BIRTH, CREATED_AT, CREATED_USER)" +
                " VALUES (?,?,?,?,?,?,?) ON CONFLICT (ID) DO NOTHING;";
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        int[] batchResults = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Student student = studentList.get(i);
                // Insert question
                ps.setString(1, student.getId());
                ps.setString(2, student.getFullName());
                ps.setString(3, student.getPassword());
                ps.setString(4, student.getGender());
                ps.setDate(5, student.getDateOfBirth());
                ps.setTimestamp(6, currentTime);
                ps.setString(7, createUser);
            }

            @Override
            public int getBatchSize() {
                return studentList.size();
            }
        });

        // Ghi nhan ket qua insert cho tung question
        for (int i = 0; i < batchResults.length; i++) {
            if (batchResults[i] >= 0) {
                batchInsertResult.addSuccessCount(1);
                continue;
            }

            batchInsertResult.addFailedCount(1);
            batchInsertResult.addEntityError(studentList.get(i).getId(), Translator.toLocale("user.insert.failed"));
        }
    }

    private void updateBatchInsertQuestionAnswerResult(
            BatchInsertResult batchInsertResult,
            List<QuestionAnswerDTO> questionAnswerList,
            Map<Long, Boolean> questionInsertResult,
            Map<Long, Set<String>> answerInsertResult) {
        for (QuestionAnswerDTO questionAnswer: questionAnswerList) {
            Long questionId = questionAnswer.getQuestion().getId();
            boolean questionSuccess = questionInsertResult.get(questionId);

            if (questionSuccess) {
                Set<String> failedAnswer = answerInsertResult.get(questionId);
                if(DataUtils.isEmptyOrNull(failedAnswer)) {
                    batchInsertResult.addSuccessCount(1);
                    continue;
                }

                String failedAnswerList = String.join(",", failedAnswer);
                StringBuilder description = new StringBuilder();
                description.append(Translator.toLocale("db.insert.batch.answer.error"));
                description.append(" ");
                description.append(failedAnswerList);

                batchInsertResult.addEntityError(
                        questionAnswer.getQuestion().getContent(),
                        description.toString());
                batchInsertResult.setFailedCount(1);
            } else {
                batchInsertResult.addEntityError(
                        questionAnswer.getQuestion().getContent(),
                        Translator.toLocale("db.insert.batch.question.error"));
                batchInsertResult.addFailedCount(1);
            }
        }
    }
}
