package com.vvh.vnua_test.controller;

import com.vvh.vnua_test.dto.response.ResponseData;
import com.vvh.vnua_test.dto.response.ResponseDataList;
import com.vvh.vnua_test.dto.response.ResponseError;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(path = "/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    public ResponseData<?> findById(Long id) {
        try {

        } catch (Exception e) {

        }
        return null;
    }

    @GetMapping(path = "/all")
    public ResponseData<?> findAll(Pageable pageable) {
        try {
            return new ResponseDataList<>("student.get.list.student", studentService.findAll(pageable));
        } catch (LogicException lEx) {
            log.error(lEx.getMessage(), lEx);
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }
}
