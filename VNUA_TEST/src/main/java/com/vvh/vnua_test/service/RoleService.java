package com.vvh.vnua_test.service;

import com.vvh.vnua_test.dto.model.RoleDTO;
import com.vvh.vnua_test.dto.request.CreateRoleRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {

    void createRole(CreateRoleRequest request);

    RoleDTO findByRoleName(String roleName);

    Page<RoleDTO> findAll(Pageable pageable);

    RoleDTO findById(Long id);
}
