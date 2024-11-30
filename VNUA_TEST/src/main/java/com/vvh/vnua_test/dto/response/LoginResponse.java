package com.vvh.vnua_test.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record LoginResponse(
        String username,
        String accessToken,
        String refreshToken,
        List<String> roles
) {
}
