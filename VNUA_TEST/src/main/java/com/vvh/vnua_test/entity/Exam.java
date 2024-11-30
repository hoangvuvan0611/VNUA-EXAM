package com.vvh.vnua_test.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.f4b6a3.tsid.TsidCreator;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Đối tượng đề thi, chứa thông tin đề, mã môn học, dữ liệu bộ câu hỏi của đề lưu dưới dạng json
 * Mỗi đề sẽ có data là chuỗi json: chứa mã câu hỏi, và id câu trả lời xếp tuần
 */
@Data
@Entity
@Table(name = "EXAMS")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exam {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "DURATION")
    private Long duration;

    @Column(name = "SUBJECT_ID")
    private Long subjectId;

    @Column(name = "DATA", columnDefinition = "jsonb")
    private String data;

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

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<ExamSet> users = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
