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
 * Đối tượng chứa các thông tin mở rộng của câu hỏi có thể lưu hoặc mở rộng sau như: Mã môn học, loại câu hỏi tự luận,
 * trắc nghiệm, mức độ của câu hỏi... đáp án Theo dạng Key - Value
 */
@Data
@Entity
@Table(name = "QUESTION_EXT")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionExt {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "QUESTION_ID")
    private String questionId;

    @Column(name = "KEY")
    private String key;

    @Column(name = "VALUES")
    private String value;

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
