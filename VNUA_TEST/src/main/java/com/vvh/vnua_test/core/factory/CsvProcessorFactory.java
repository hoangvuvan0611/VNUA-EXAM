package com.vvh.vnua_test.core.factory;

import com.vvh.vnua_test.common.constant.consts.MyConst;
import com.vvh.vnua_test.core.processor.reader.CsvReader;
import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.core.processor.validator.CsvValidator;
import com.vvh.vnua_test.core.processor.validator.FileValidator;
import com.vvh.vnua_test.core.processor.writer.CsvWriter;
import com.vvh.vnua_test.core.processor.writer.FileWriter;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class CsvProcessorFactory implements FileProcessorFactory {

    private final ApplicationContext applicationContext;

    public CsvProcessorFactory(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public FileReader<?> createReader() {
        return applicationContext.getBean(CsvReader.class, Object.class);
    }

    @Override
    public FileWriter<?> createWriter() {
        return new CsvWriter<>();
    }

    @Override
    public FileValidator createValidator() {
        return new CsvValidator();
    }

    @Override
    public String getFileType() {
        return MyConst.FILE_TYPE_CSV;
    }
}
