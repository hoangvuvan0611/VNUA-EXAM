package com.vvh.vnua_test.utils;

public class StringUtils {

    // Kiem tra chuoi null hoac rong
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    // Viet hoa chu cai dau tien
    public static String capitalizeFirstLetter(String str) {
        if (isNullOrEmpty(str)) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }

    // Chuyen chuoi sang dang snake_case
    // input: JavaPythonC
    // output: java_python_c
    public static String toSnakeCase(String str) {
        if (isNullOrEmpty(str)) return str;
        return str.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }

    // Dao nguoc chuoi
    public static String reverse(String str) {
        if (isNullOrEmpty(str)) return str;
        return new StringBuilder(str).reverse().toString();
    }

    // Xoa khoang trang giua cac tu
    public static String removeExtraSpaces(String str) {
        if (isNullOrEmpty(str)) return str;
        return str.trim().replaceAll("\\s+", " ");
    }

    // Kiem tra chuoi co phai so
    public static boolean isNumeric(String str) {
        if (isNullOrEmpty(str)) return false;
        return str.matches("-?\\d+(\\.\\d+)?");
    }

    // join mot danh sach chuoi voi ky tu phan cach
    public static String joinStrings(String delimeter, String... strs) {
        if (strs == null || strs.length == 0) return "";
        return String.join(delimeter, strs);
    }

    // Tach chuoi thanh danh sach dua tren dau phan cach
    public static String[] splitStrings(String str, String delimeter) {
        if (isNullOrEmpty(str)) return new String[0];
        return str.split(delimeter);
    }
}
