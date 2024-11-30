package com.vvh.vnua_test.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class CreateRoleRequest {

    @NotEmpty(message = "role.name.not.allow.empty")
    private String role;

    private String description;
}
