package com.vvh.vnua_test.entity;

import com.github.f4b6a3.tsid.TsidCreator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

/**
 * Đối tượng câu hỏi, chỉ chứa nội dung câu hỏi, không thể xóa câu hỏi vì là đối tượng lưu giữ kết quả của sinh viên
 */
@Data
@Entity
@Table(name = "QUESTIONS")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "CONTENT", length = 1000)
    private String content;

    @Column(name = "CORRECT_ANSWER")
    private String correctAnswer;

    @Column(name = "QUESTION_TYPE")
    private String questionType;

    @Column(name = "SUBJECT_ID")
    private String subjectId;

    @Column(name = "CHAPTER_INDEX")
    private String chapterIndex;

    @Column(name = "IS_ACTIVE")
    private boolean isActive;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER")
    private String createUser;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;

    @Column(name = "UPDATED_USER")
    private String updatedUser;

    @PrePersist
    public void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
