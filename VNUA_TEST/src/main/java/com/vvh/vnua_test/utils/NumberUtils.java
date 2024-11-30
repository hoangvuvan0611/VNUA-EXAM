package com.vvh.vnua_test.utils;

import java.math.BigDecimal;
import java.util.Optional;

public class NumberUtils {

    // Chuoi thanh so nguyen
    public static int parseInt(String str) {
        if (DataUtils.isEmptyOrNull(str)) return 0;
        return Integer.parseInt(str);
    }

    public static int parseIntWithDefault(String str, int defaultValue) {
        if (DataUtils.isEmptyOrNull(str)) return defaultValue;
        return Integer.parseInt(str);
    }

    // chuoi thanh so thuc
    public static double parseDouble(String str) {
        if (DataUtils.isEmptyOrNull(str)) return 0;
        return Double.parseDouble(str);
    }

    public static double parseDoubleWithDefault(String str, double defaultValue) {
        if (DataUtils.isEmptyOrNull(str)) return defaultValue;
        return Double.parseDouble(str);
    }

    public static float parseFloat(String str) {
        if (DataUtils.isEmptyOrNull(str)) return 0;
        return Float.parseFloat(str);
    }

    public static float parseFloatWithDefault(String str, float defaultValue) {
        if (DataUtils.isEmptyOrNull(str)) return defaultValue;
        return Float.parseFloat(str);
    }

    public static long parseLong(String str) {
        if (DataUtils.isEmptyOrNull(str)) return 0;
        return Long.parseLong(str);
    }

    public static long parseLongWithDefault(String str, long defaultValue) {
        if (DataUtils.isEmptyOrNull(str)) return defaultValue;
        return Long.parseLong(str);
    }

    // Chuyển đổi số thành kiểu BigDecimal
    public static BigDecimal toBigDecimal(Number value) {
        if (DataUtils.isEmptyOrNull(value)) return BigDecimal.ZERO;
        return new BigDecimal(value.toString());
    }

    // Lấy giá trị lớn nhất từ một mảng số nguyên
    public static Optional<Integer> max(int[] numbers) {
        if (numbers == null || numbers.length == 0) return Optional.empty();
        int max = numbers[0];
        for (int number : numbers) {
            if (number > max) max = number;
        }
        return Optional.of(max);
    }

    // Lấy giá trị nhỏ nhất từ một mảng số nguyên
    public static Optional<Integer> min(int[] numbers) {
        if (numbers == null || numbers.length == 0) return Optional.empty();
        int min = numbers[0];
        for (int number : numbers) {
            if (number < min) min = number;
        }
        return Optional.of(min);
    }

    // Tính tổng một mảng số nguyên
    public static int sum(int[] numbers) {
        if (numbers == null) return 0;
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        return sum;
    }

    // Tính trung bình một mảng số nguyên
    public static double average(int[] numbers) {
        if (numbers == null || numbers.length == 0) return 0.0;
        return (double) sum(numbers) / numbers.length;
    }

    // Kiểm tra số có nằm trong một khoảng
    public static boolean isInRange(int value, int min, int max) {
        return value >= min && value <= max;
    }
}
