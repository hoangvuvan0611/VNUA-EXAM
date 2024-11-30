package com.vvh.vnua_test.core.processor.reader;

import com.vvh.vnua_test.common.constant.consts.MyConst;
import org.apache.commons.compress.utils.FileNameUtils;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CsvReaderTest {

    @Autowired
    private CsvReader csvReader;

    private final String path = "C:\\Users\\Admin\\Downloads\\account_activities_202410.csv";

    @Test
    void readFile() throws IOException {

        // Duong dan toi file csv that tren may de test
        Path path = Path.of(this.path);

        // Chuyen noi dung file thanh byte array
        byte[] contentByte = Files.readAllBytes(path);

        // Mock MultipartFile tu byte array
        MultipartFile multipartFile = new MockMultipartFile("file", contentByte);

        String type = FileNameUtils.getExtension(multipartFile.getOriginalFilename());

        // Khoi tao CsvReader va doc file qua multipartFile
        csvReader.readFile(multipartFile, MyConst.OBJECT_TYPE_QUESTION);
    }

    @Test
    void readFileFromPath() throws IOException {

        csvReader.readFileFromPath(path);
    }
}