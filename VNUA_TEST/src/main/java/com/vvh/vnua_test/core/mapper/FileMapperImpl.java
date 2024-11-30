package com.vvh.vnua_test.core.mapper;

import com.vvh.vnua_test.common.constant.consts.MyConst;
import com.vvh.vnua_test.dto.model.QuestionAnswerDTO;
import com.vvh.vnua_test.entity.Answer;
import com.vvh.vnua_test.entity.Question;
import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.utils.DataUtils;
import com.vvh.vnua_test.utils.DateUtils;
import com.vvh.vnua_test.utils.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

@Service
public class FileMapperImpl<T> implements FileMapper {

    @Override
    public QuestionAnswerDTO mapperQuestionAnswerFile(String[] headers, String[] rows) {

        QuestionAnswerDTO questionAnswer = QuestionAnswerDTO.builder()
                .answers(new ArrayList<>())
                .build();
        Question question = Question.builder()
                .id(DataUtils.genTSID())
                .isActive(true)
                .build();

        // Su dung map de anh xa header (map chua hanh dong)
        Map<String, Consumer<String>> headerMapping = new HashMap<>();
        headerMapping.put(MyConst.HEADER_SUBJECT_CODE, question::setSubjectId);
        headerMapping.put(MyConst.HEADER_QUESTION, question::setContent);
        headerMapping.put(MyConst.HEADER_CHAPTER, question::setChapterIndex);
        headerMapping.put(MyConst.HEADER_CORRECT_ANSWER, question::setCorrectAnswer);
        headerMapping.put(MyConst.HEADER_TYPE_QUESTION, questionAnswer::setType);
        headerMapping.put(MyConst.HEADER_ANSWER, answerContent -> {
            if (DataUtils.isEmptyOrNull(answerContent.trim())) return;
            Answer answer = Answer.builder()
                    .id(DataUtils.genTSID())
                    .questionId(question.getId())
                    .content(answerContent)
                    .isActive(true)
                    .build();
            questionAnswer.getAnswers().add(answer);
        });

        // Duyet qua header va anh xa gia tri
        for (int i = 0; i < headers.length; i++) {
            // Tim hanh dong tuong ung trong map voi header dua vao
            Consumer<String> action = headerMapping.get(headers[i].trim());
            if (action != null) {
                // Neu co hanh dong tim thay theo header, thuc thi hanh dong
                action.accept(rows[i]);
            }
        }

        questionAnswer.setQuestion(question);
        return questionAnswer;
    }

    @Override
    public Student mapperStudentFile(String[] headers, String[] row) {
        Student student = new Student();
        StringBuilder fullName = new StringBuilder();

        // Su dung map de anh xa header (map chua hanh dong)
        Map<String, Consumer<String>> headerMapping = new HashMap<>();
        headerMapping.put(MyConst.HEADER_STUDENT_CODE, s -> {
            if (StringUtils.isNullOrEmpty(s)) throw new LogicException("MSF00001", "user.id.null.empty");
            student.setId(s);
        });
        headerMapping.put(MyConst.HEADER_SURNAME, s -> {
           if (!StringUtils.isNullOrEmpty(s)) fullName.append(s);
        });
        headerMapping.put(MyConst.HEADER_NAME, s -> {
            if (!StringUtils.isNullOrEmpty(s)) {
                fullName.append(" ");
                fullName.append(s);
            }
        });
        headerMapping.put(MyConst.HEADER_FULL_NAME, student::setFullName);
        headerMapping.put(MyConst.HEADER_DATE_OF_BIRTH, s -> {
            String pattern = s.contains("/") ? DateUtils.ddMMyyyy2 : DateUtils.ddMMyyyy;
            student.setDateOfBirth(DateUtils.stringToDateSQL(s, pattern));
        });
        headerMapping.put(MyConst.HEADER_GENDER, student::setGender);

        for (int i = 0; i < headers.length; i++) {
            Consumer<String> action = headerMapping.get(headers[i].toLowerCase());
            if (action != null) {
                action.accept(row[i]);
            }
        }

        if (StringUtils.isNullOrEmpty(student.getFullName())) student.setFullName(fullName.toString());
        return student;
    }
}
