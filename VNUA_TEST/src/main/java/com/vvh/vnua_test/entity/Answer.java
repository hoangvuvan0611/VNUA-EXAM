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
 * Đối tượng câu trả lời của câu hỏi trắc nghiệm, chứa id của câu hỏi nên số lượng câu trả lời là không giới hạn và
 * có thể mở rộng tùy ý số lượng câu trả lời, không thể xóa câu trả lời vì là đối tượng lưu giữ kết quả của sinh viên
 */
@Data
@Entity
@Table(name = "ANSWERS")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(name = "IS_ACTIVE")
    private boolean isActive;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER")
    private String createdUser;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;

    @Column(name = "UPDATED_USER")
    private String updatedUser;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
