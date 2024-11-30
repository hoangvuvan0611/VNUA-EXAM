package com.vvh.vnua_test.service;

import com.vvh.vnua_test.entity.User;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.UserRepository;
import com.vvh.vnua_test.utils.DataUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user;
        if(DataUtils.isEmail(usernameOrEmail)) {
            user = userRepository.findByEmail(usernameOrEmail).orElseThrow(() -> new LogicException("LUBU00001", "user.not.found"));
        } else {
            user = userRepository.findByUsername(usernameOrEmail).orElseThrow(() -> new LogicException("LUBU00002", "user.not.found"));
        }
        if(user == null) throw new LogicException("LUBU00003", "user.not.found");
        return user;
    }
}
