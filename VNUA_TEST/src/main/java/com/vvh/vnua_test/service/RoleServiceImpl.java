package com.vvh.vnua_test.service;

import com.vvh.vnua_test.common.enums.RoleEnum;
import com.vvh.vnua_test.dto.model.RoleDTO;
import com.vvh.vnua_test.dto.request.CreateRoleRequest;
import com.vvh.vnua_test.entity.Role;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createRole(CreateRoleRequest request) {
        RoleEnum roleEnum;
        try {
            roleEnum = RoleEnum.valueOf(request.getRole());
        } catch (IllegalArgumentException ex) {
            throw new LogicException("CR000001", "role.does.not.exist");
        }

        boolean roleExists = existsByRoleName(roleEnum);
        if (roleExists) throw new LogicException("CR000002", "role.already.exists");

        Role role = Role.builder()
                .role(roleEnum)
                .description(request.getDescription())
                .build();
        roleRepository.save(role);
    }

    @Override
    public RoleDTO findByRoleName(String roleName) {
        RoleEnum roleEnum;
        try {
            roleEnum = RoleEnum.valueOf(roleName);
        } catch (IllegalArgumentException ex) {
            throw new LogicException("CR000001", "role.does.not.exist");
        }

        Role role = roleRepository.findRoleByRole(roleEnum).orElseThrow(() -> new LogicException("RSI00001", "role.not.found"));
        return modelMapper.map(role, RoleDTO.class);
    }

    @Override
    public Page<RoleDTO> findAll(Pageable pageable) {
        Page<Role> roles = roleRepository.findAll(pageable);
        return roles.map(role -> modelMapper.map(role, RoleDTO.class));
    }

    @Override
    public RoleDTO findById(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new LogicException("FBI00001", "role.not.found"));
        return modelMapper.map(role, RoleDTO.class);
    }

    private boolean existsByRoleName(RoleEnum role) {
        return roleRepository.existsRoleByRole(role);
    }
}
