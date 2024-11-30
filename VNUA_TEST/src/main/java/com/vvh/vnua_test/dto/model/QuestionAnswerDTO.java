package com.vvh.vnua_test.dto.model;

import com.vvh.vnua_test.entity.Answer;
import com.vvh.vnua_test.entity.Question;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAnswerDTO {
    private Question question;
    private List<Answer> answers;
    private String correctAnswer;
    private String type;
    private String subjectCode;
    private String chapter;
}
