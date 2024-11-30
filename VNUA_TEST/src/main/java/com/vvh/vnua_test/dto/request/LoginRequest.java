package com.vvh.vnua_test.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class LoginRequest {

    @NotEmpty(message = "user.name.not.allow.empty")
    private String usernameOrEmail;

    @NotEmpty(message = "user.password.not.allow.empty")
    private String password;
}
