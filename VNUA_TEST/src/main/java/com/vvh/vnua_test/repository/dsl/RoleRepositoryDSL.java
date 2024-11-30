package com.vvh.vnua_test.repository.dsl;

import com.vvh.vnua_test.dto.model.RoleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleRepositoryDSL {

    Page<RoleDTO> findAllRoles(Pageable pageable);
}
