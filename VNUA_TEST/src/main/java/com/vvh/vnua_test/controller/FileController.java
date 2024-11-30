package com.vvh.vnua_test.controller;

import com.vvh.vnua_test.dto.response.ResponseData;
import com.vvh.vnua_test.dto.response.ResponseError;
import com.vvh.vnua_test.exception.LogicException;
import com.vvh.vnua_test.service.FileProcessingServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping(path = "/file")
@RequiredArgsConstructor
public class FileController {

    private final FileProcessingServiceImpl fileProcessingServiceImpl;

    @PostMapping(path = "/readFileQuestion")
    public ResponseData<?> readFileQuestion(@RequestParam("file") MultipartFile file) {
        try {
            return new ResponseData<>("file.read.success",  fileProcessingServiceImpl.readFileQuestion(file));
        } catch (Exception ex) {
            log.error("Read file question error: {}" , ex.getMessage(), ex);
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @PostMapping(path = "/readFileStudent")
    public ResponseData<?> readFileStudent(@RequestParam("file") MultipartFile file) {
        try {
            return new ResponseData<>("file.read.success", fileProcessingServiceImpl.readFileStudent(file));
        } catch (LogicException lEx) {
            log.error("Read file student error: {}" , lEx.getMessage(), lEx);
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), lEx.getMessage());
        }
        catch (Exception ex) {
            log.error("Read file student error: {}" , ex.getMessage());
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        }
    }

    @GetMapping(path = "/path?{path}")
    public void readFileWithPath(@PathVariable String path) {

    }
}
