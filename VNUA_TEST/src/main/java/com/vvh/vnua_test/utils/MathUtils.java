package com.vvh.vnua_test.utils;

public class MathUtils {

    // Tim gia tri lon hon
    public static int max(int i, int j) {
        return Math.max(i, j);
    }

    // Tim gia tri nho hon
    public static int min(int i, int j) {
        return Math.min(i, j);
    }

    // Lam tron so thap phan
    public static double round(double value, int places) {
        double scale = Math.pow(10, places);
        return Math.round(value * scale) / scale;
    }
}
