package com.vvh.vnua_test.controller;

import com.vvh.vnua_test.dto.request.CreateUserRequest;
import com.vvh.vnua_test.dto.request.UpdatePasswordRequest;
import com.vvh.vnua_test.dto.response.ResponseData;
import com.vvh.vnua_test.dto.response.ResponseError;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping(path = "/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'SUPERVISOR', 'MANAGER')")
    @PostMapping(path = "/create")
    public ResponseData<?> createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
        try {
            userService.createUser(createUserRequest);
            return new ResponseData<>("user.create.success", null);
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

//    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'SUPERVISOR')")
    @GetMapping(path = "/username={username}")
    public ResponseData<?> getByUsername(@PathVariable String username) {
        try {
            return new ResponseData<>("user.get.success", userService.findUserByUsername(username));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/id={id}")
    public ResponseData<?> getUserById(@PathVariable Long id) {
        try {
            return new ResponseData<>("user.get.success", userService.findUserById(id));
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    //    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'SUPERVISOR')")
    @GetMapping(path = "/all")
    public ResponseData<?> getAll(Pageable pageable) {
        try {
            return new ResponseData<>("user.get.list.user", userService.findAll(pageable));
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/password={password}")
    public ResponseData<?> verifyPassword(@PathVariable String password) {
        try {
            return new ResponseData<>("common.password.verify.success", userService.verifyPassword(password));
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @PostMapping(path = "/updatePassword")
    public ResponseData<?> updatePassword(@Valid @RequestBody UpdatePasswordRequest request) {
        try {
            userService.updatePassword(request);
            return new ResponseData<>("user.password.update.success", null);
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }
}
