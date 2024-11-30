package com.vvh.vnua_test.core.factory;

import com.vvh.vnua_test.common.constant.consts.MyConst;
import com.vvh.vnua_test.core.processor.reader.ExcelReader;
import com.vvh.vnua_test.core.processor.reader.FileReader;
import com.vvh.vnua_test.core.processor.validator.ExcelValidator;
import com.vvh.vnua_test.core.processor.validator.FileValidator;
import com.vvh.vnua_test.core.processor.writer.ExcelWriter;
import com.vvh.vnua_test.core.processor.writer.FileWriter;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class ExcelProcessorFactory implements FileProcessorFactory {

    private final ApplicationContext applicationContext;

    public ExcelProcessorFactory(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public FileReader<?> createReader() {
        return applicationContext.getBean(ExcelReader.class, Object.class);
    }

    @Override
    public FileWriter<?> createWriter() {
        return new ExcelWriter<>();
    }

    @Override
    public FileValidator createValidator() {
        return new ExcelValidator();
    }

    @Override
    public String getFileType() {
        return MyConst.FILE_TYPE_EXCEL;
    }
}
