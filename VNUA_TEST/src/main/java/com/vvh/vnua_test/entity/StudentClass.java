package com.vvh.vnua_test.entity;

import com.github.f4b6a3.tsid.TsidCreator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@Table(name = "STUDENT_CLASS", indexes = @Index(name = "idx_studentClass_className", columnList = "CLASS_NAME"))
@NoArgsConstructor
@AllArgsConstructor
public class StudentClass {
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "CLASS_NAME")
    private String className;

    @Column(name = "FACULTY_ID")
    private Long facultyId;

    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER")
    private String createdUser;

    @Column(name = "UPDATED_DATE")
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
