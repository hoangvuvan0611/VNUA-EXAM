package com.vvh.vnua_test.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "SESSION_REGISTRATION")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionRegistration {

    @Id
    @Column(name = "EXAM_SESSION_ID")
    private Long examSessionId;

    @Id
    @Column(name = "USER_ID")
    private Long userId;
}
