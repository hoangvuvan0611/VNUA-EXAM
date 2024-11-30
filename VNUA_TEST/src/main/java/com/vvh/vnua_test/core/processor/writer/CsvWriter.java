package com.vvh.vnua_test.core.processor.writer;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class CsvWriter<T> implements FileWriter<T> {

    @Override
    public void write(List<T> data, String filePath) throws IOException {

    }
}
