package com.vvh.vnua_test.entity;

import com.github.f4b6a3.tsid.TsidCreator;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Bộ đề, thường dùng cho một phòng thi
 */
@Data
@Entity
@Table(name = "EXAM_RESULT")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamSet {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "SUBJECT_ID")
    private String subjectId;

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

    @ManyToMany
    @JoinTable(
            name = "EXAMSETS_EXAMS",
            joinColumns = @JoinColumn(name = "EXAM_SET_ID"),
            inverseJoinColumns = @JoinColumn(name = "EXAM_ID")
    )
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Exam> roles = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
