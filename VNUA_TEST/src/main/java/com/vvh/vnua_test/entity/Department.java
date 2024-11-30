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
 * Đối tượng bỘ mÔn
 */
@Data
@Entity
@Table(name = "DEPARTMENTS")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "DEPARTMENT_NAME", nullable = false)
    private String departmentName;

    @Column(name = "DEPARTMENT_CODE")
    private String departmentCode;

    @Column(name = "DESCRIPTION", length = 2000)
    private String description;

    @Column(name = "FACULTIES_ID")
    private Long facultiesId;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER", nullable = false)
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
