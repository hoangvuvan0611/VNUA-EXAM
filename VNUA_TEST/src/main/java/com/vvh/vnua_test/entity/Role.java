package com.vvh.vnua_test.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.github.f4b6a3.tsid.TsidCreator;
import com.vvh.vnua_test.common.enums.RoleEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.ManyToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Đối tượng vai trò của phần mềm, bao gồm cả các vai trò, cấp bậc của hệ thống
 */
@Getter
@Setter
@Entity
@Table(name = "ROLES")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @Column(name = "DESCRIPTION")
    private String description;

    @CreationTimestamp
    @Column(name = "CREATE_AT")
    private Timestamp createdAt;

    @Column(name = "CREATED_USER")
    private String createdUser;

    @UpdateTimestamp
    @Column(name = "UPDATE_AT")
    private Timestamp updatedAt;

    @Column(name = "UPDATED_USER")
    private String updatedUser;

    @JsonBackReference
    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
        }
    }
}
