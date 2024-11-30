package com.vvh.vnua_test.service;

import com.vvh.vnua_test.dto.request.LoginRequest;
import com.vvh.vnua_test.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse loginUser(LoginRequest loginRequest);
}
