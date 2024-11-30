package com.vvh.vnua_test.controller;

import com.vvh.vnua_test.dto.model.RoleDTO;
import com.vvh.vnua_test.dto.request.CreateRoleRequest;
import com.vvh.vnua_test.dto.response.ResponseData;
import com.vvh.vnua_test.dto.response.ResponseError;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping(path = "/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping(path = "/create")
    public ResponseData<?> createRole(@Valid @RequestBody CreateRoleRequest request) {
        try {
            roleService.createRole(request);
            return new ResponseData<>("role.create.success", null);
        } catch (LogicException lEx) {
          return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error("Create role failed by {}", ex.getMessage());
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/name?{name}")
    public ResponseData<?> getByRoleName(@PathVariable String name) {
        try {
            RoleDTO roleDTO = roleService.findByRoleName(name);
            return new ResponseData<>("role.found.one", roleDTO);
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error("Get role by name {} error: {}", name, ex.getMessage());
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/all")
    public ResponseData<?> getAllRole(Pageable pageable) {
        try {
            return new ResponseData<>("role.get.all", roleService.findAll(pageable));
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
          log.error("Get all role error: {}", ex.getMessage());
          return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseData<?> getById(@PathVariable Long id) {
        try {
            RoleDTO roleDTO = roleService.findById(id);
            return new ResponseData<>("role.found.one", roleDTO);
        } catch (LogicException lEx) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error("Get role by id {} error: {}", id, ex.getMessage());
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }
}
