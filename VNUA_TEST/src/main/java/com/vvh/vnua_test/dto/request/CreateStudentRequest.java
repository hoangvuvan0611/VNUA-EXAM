package com.vvh.vnua_test.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreateStudentRequest {

    @NotEmpty(message = "student.code.empty")
    @NotNull(message = "student.code.null")
    private String studentCode;

    @NotNull(message = "student.name.null")
    @NotEmpty(message = "student.name.empty")
    private String fullName;

    private String dateOfBirth;

    private String gender;

    private String className;
}
