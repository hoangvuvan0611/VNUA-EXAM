package com.vvh.vnua_test.repository.dsl;

import com.vvh.vnua_test.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryDSL {
    Page<User> getAllUser(Pageable pageable);
}
