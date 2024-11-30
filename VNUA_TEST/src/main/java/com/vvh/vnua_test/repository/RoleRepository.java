package com.vvh.vnua_test.repository;

import com.vvh.vnua_test.common.enums.RoleEnum;
import com.vvh.vnua_test.entity.Role;
import com.vvh.vnua_test.repository.dsl.RoleRepositoryDSL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>, RoleRepositoryDSL {

    Optional<Role> findRoleByRole(RoleEnum role);

    boolean existsRoleByRole(RoleEnum role);

    Optional<Role> findById(Long id);
}
