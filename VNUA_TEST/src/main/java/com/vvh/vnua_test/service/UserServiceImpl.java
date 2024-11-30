package com.vvh.vnua_test.service;

import com.vvh.vnua_test.core.mapstruct.UserMapper;
import com.vvh.vnua_test.dto.model.UserDTO;
import com.vvh.vnua_test.dto.model.UserGetAllDTO;
import com.vvh.vnua_test.dto.request.CreateUserRequest;
import com.vvh.vnua_test.dto.request.UpdatePasswordRequest;
import com.vvh.vnua_test.entity.Role;
import com.vvh.vnua_test.entity.User;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.RoleRepository;
import com.vvh.vnua_test.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createUser(CreateUserRequest request) throws LogicException {
        boolean isExists = existsByUsername(request.getUsername());
        if (isExists) throw new LogicException("CU00001","user.name.already.exists");

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findById(request.getRoleId()).orElseThrow(() -> new LogicException("FBI00001", "role.not.found"));
        roles.add(role);

        user.setRoles(roles);
        userRepository.save(user);
        userRepository.flush();
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new LogicException("FBBE00002", "user.not.found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO findUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new LogicException("FUBU00002", "user.not.found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new LogicException("FBI00001", "role.not.found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public Page<UserGetAllDTO> findAll(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> modelMapper.map(user, UserGetAllDTO.class));
    }

    @Override
    public boolean verifyPassword(String password) {
        User user = getCurrentUser();
        if(user == null) return false;
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(UpdatePasswordRequest request) {
        User user = getCurrentUser();
        boolean isVerified = verifyPassword(request.getPassword());
        if(!isVerified) throw new LogicException("FBI00002", "user.password.verification.failed");

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }

    private boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    private boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
