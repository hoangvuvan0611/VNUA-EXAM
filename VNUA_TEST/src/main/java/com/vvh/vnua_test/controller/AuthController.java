package com.vvh.vnua_test.controller;

import com.vvh.vnua_test.dto.request.LoginRequest;
import com.vvh.vnua_test.dto.response.LoginResponse;
import com.vvh.vnua_test.dto.response.ResponseData;
import com.vvh.vnua_test.dto.response.ResponseError;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(path = "/login")
    public ResponseData<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.loginUser(loginRequest);
            return new ResponseData<>("login.success", response);
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }
}
