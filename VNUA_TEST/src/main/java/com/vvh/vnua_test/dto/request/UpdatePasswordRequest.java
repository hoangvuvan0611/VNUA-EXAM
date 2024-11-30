package com.vvh.vnua_test.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class UpdatePasswordRequest {

    @NotEmpty(message = "user.password.not.allow.empty")
    private String password;

    @NotEmpty(message = "user.new.password.not.allow.empty")
    private String newPassword;
}
