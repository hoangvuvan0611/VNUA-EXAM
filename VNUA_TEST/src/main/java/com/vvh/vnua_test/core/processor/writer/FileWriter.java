package com.vvh.vnua_test.core.processor.writer;

import java.io.IOException;
import java.util.List;

public interface FileWriter<T> {
    void write(List<T> data, String filePath) throws IOException;
}
