package com.vvh.vnua_test.core.factory;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class FileProcessorFactoryProvider {

    private final Map<String, FileProcessorFactory> factoryMap;

    public FileProcessorFactoryProvider(List<FileProcessorFactory> factoryList) {
        this.factoryMap = factoryList.stream().collect(
                Collectors.toMap(
                        FileProcessorFactory::getFileType,
                        factory -> factory
                )
        );
    }

    public FileProcessorFactory getFactory(String fileType) {
        FileProcessorFactory factory = factoryMap.get(fileType.toLowerCase());
        if (factory == null) {
            throw new IllegalArgumentException("Unknown file type: " + fileType);
        }
        return factory;
    }
}
