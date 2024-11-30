package com.vvh.vnua_test.service;

import com.vvh.vnua_test.dto.model.UserDTO;
import com.vvh.vnua_test.dto.model.UserGetAllDTO;
import com.vvh.vnua_test.dto.request.CreateUserRequest;
import com.vvh.vnua_test.dto.request.UpdatePasswordRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    public void createUser(CreateUserRequest request);
    UserDTO findUserByEmail(String email);
    UserDTO findUserByUsername(String username);
    UserDTO findUserById(Long id);
    Page<UserGetAllDTO> findAll(Pageable pageable);
    boolean verifyPassword(String password);
    void updatePassword(UpdatePasswordRequest request);
}
