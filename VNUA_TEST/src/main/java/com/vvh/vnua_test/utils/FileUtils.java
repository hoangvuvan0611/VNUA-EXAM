package com.vvh.vnua_test.utils;

import com.vvh.vnua_test.exception.LogicException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

public class FileUtils {

    // Doc noi dung file thanh danh sach cac dong
    public static List<String> readLines(String filePath) {
        try {
            return Files.readAllLines(Paths.get(filePath));
        } catch (IOException e) {
            throw new LogicException("RL00001", "file.read.line");
        }
    }

    // Ghi danh sach theo dong vao file
    public static void writeLines(String filePath, List<String> lines) {
        try {
            Files.write(Paths.get(filePath), lines);
        } catch (IOException e) {
            throw new LogicException("WL00001", "file.write.line");
        }
    }

    // Xoa file
    public static boolean deleteFile(String filePath) {
        return new File(filePath).delete();
    }

    // Kiem tra xem file co ton tai
    public static boolean isFileExists(String filePath) {
        return new File(filePath).exists();
    }

    // Doc noi dung file thanh chuoi
    public static String readFileToString(String filePath) {
        try {
            return Files.readString(Paths.get(filePath));
        } catch (IOException e) {
            throw new LogicException("DF00001", "file.write.to.string");
        }
    }

    public static void copyFile(String srcFilePath, String destFilePath) throws IOException {
        Files.copy(Paths.get(srcFilePath), Paths.get(destFilePath), StandardCopyOption.REPLACE_EXISTING);
    }

    // Doi ten file
    public static boolean renameFile(String srcFilePath, String destFilePath) {
        File srcFile = new File(srcFilePath);
        File destFile = new File(destFilePath);
        return srcFile.renameTo(destFile);
    }
}
