package com.vvh.vnua_test.dto.model;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentShowListDTO {
    private String id;
    private String fullName;
    private String className;
    private Date dateOfBirth;
    private String gender;
    private String address;
    private Timestamp loggedAt;
}
