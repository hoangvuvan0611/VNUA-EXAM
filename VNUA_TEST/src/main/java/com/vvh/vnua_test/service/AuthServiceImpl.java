package com.vvh.vnua_test.service;

import com.vvh.vnua_test.common.enums.TokenTypeEnum;
import com.vvh.vnua_test.dto.request.LoginRequest;
import com.vvh.vnua_test.dto.response.LoginResponse;
import com.vvh.vnua_test.entity.User;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.UserRepository;
import com.vvh.vnua_test.utils.DataUtils;
import com.vvh.vnua_test.utils.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) {
        boolean isEmail = DataUtils.isEmail(loginRequest.getUsernameOrEmail());
        if(isEmail) {
            if(!userRepository.existsByEmail(loginRequest.getUsernameOrEmail()))
                throw new LogicException("LU00001", "login.email.invalid");
        } else {
            if(!userRepository.existsByUsername(loginRequest.getUsernameOrEmail()))
                throw new LogicException("LU00002", "login.username.invalid");
        }

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));
        } catch (AuthenticationException aEx) {
            throw new LogicException("LU00003","login.password.invalid");
        }

        User user = (User) authentication.getPrincipal();
        String accessToken = jwtProvider.generateToken(user, TokenTypeEnum.ACCESS_TOKEN);
        String refreshToken = jwtProvider.generateToken(user, TokenTypeEnum.REFRESH_TOKEN);
        List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return LoginResponse.builder()
                .username(user.getUsername())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .roles(roles)
                .build();
    }
}
