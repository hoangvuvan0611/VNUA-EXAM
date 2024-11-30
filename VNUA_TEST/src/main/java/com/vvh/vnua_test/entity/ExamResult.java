package com.vvh.vnua_test.entity;

import com.github.f4b6a3.tsid.TsidCreator;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
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
 * Kết quả bài thi, sẽ có mỗi lần tính điểm của sinh viên,
 * Data lưu trữ id đề, id câu hỏi, id câu trả lời đã chọn
 * Nếu điểm là null thì phải mô tả lý do
 */
@Data
@Entity
@Table(name = "EXAM_RESULT")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "EXAM_ID")
    private String examId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "DATA", columnDefinition = "jsonb")
    private String data;

    @Column(name = "SCORE")
    private Integer score;

    @Column(name = "DESCRIPTION")
    private String description;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER_ID")
    private String createdUser;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;

    @Column(name = "UPDATED_USER_ID")
    private String updatedUser;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
