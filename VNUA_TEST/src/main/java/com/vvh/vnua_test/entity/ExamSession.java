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
 * Đối tượng lớp, phòng thi
 */
@Data
@Entity
@Table(name = "EXAM_SESSION")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamSession {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "ROOM_NAME")
    private String roomName;

    @Column(name = "ADDRESS", length = 1000)
    private String address;

    @Column(name = "SET_EXAM_ID")
    private String setExamId;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER")
    private String createdUser;

    @UpdateTimestamp
    @Column(name = "COMPLETED_AT")
    private Timestamp completedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
