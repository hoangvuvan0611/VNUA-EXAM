package com.vvh.vnua_test.utils;

import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.stream.Collectors;

public class CollectionUtils {

    // Kiem tra danh sach null hoac rong
    public static <T> boolean isNullOrEmpty(Collection<T> collection) {
        return collection == null || collection.isEmpty();
    }

    // Lay phan tu dau tien trong danh sach
    public static <T> T getFirstElement(List<T> list) {
        if (isNullOrEmpty(list)) return null;
        return list.getFirst();
    }

    // Lay phan tu cuoi cung trong danh sach
    public static <T> T getLastElement(List<T> list) {
        if (isNullOrEmpty(list)) return null;
        return list.getLast();
    }

    // Loai bo phan tu null khoi danh sach
    public static <T> List<T> removeNulls(List<T> list) {
        if (isNullOrEmpty(list)) return Collections.emptyList();
        return list.stream().filter(Objects::isNull).toList();
    }

    // Gop 2 danh sach
    public static <T> List<T> mergeLists(List<T> list1, List<T> list2) {
        if(isNullOrEmpty(list1)) return list2;
        if(isNullOrEmpty(list2)) return list1;
        if (isNullOrEmpty(list1) && isNullOrEmpty(list2)) return Collections.emptyList();
        List<T> result = new ArrayList<>(list1);
        result.addAll(list2);
        return result;
    }

    // Chuyen danh sach sang chuoi voi dau phan cach
    public static <T> String toDelimitedString(List<T> list, String delimiter) {
        if (isNullOrEmpty(list)) return "";
        return list.stream().map(Objects::toString).collect(Collectors.joining(delimiter));
    }
}
