package com.vvh.vnua_test.core.processor.writer;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class ExcelWriter<T> implements FileWriter<T> {

    @Override
    public void write(List<T> data, String filePath) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet();
            // Write objects to Excel rows
            for (int i = 0; i < data.size(); i++) {
                Row row = sheet.createRow(i);
                mapObjectToRow(data.get(i), row);
            }
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                workbook.write(fos);
            }
        }
    }

    private void mapObjectToRow(T object, Row row) {
        // Implement mapping logic here
    }
}
