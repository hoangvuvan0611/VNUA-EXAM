package com.vvh.vnua_test.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreateUserRequest {

    @NotEmpty(message = "user.name.not.allow.empty")
    private String username;

    @NotEmpty(message = "user.password.not.allow.empty")
    private String password;

    @NotNull(message = "common.input.name.role.name.not.valid")
    private Long roleId;

    private String facultiesId;
}
