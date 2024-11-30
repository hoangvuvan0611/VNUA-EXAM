package com.vvh.vnua_test.utils;

import com.github.f4b6a3.tsid.TsidCreator;
import com.vvh.vnua_test.common.constant.pattern.MyPattern;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataUtils {

    public static Long genTSID () {
        return TsidCreator.getTsid().toLong();  // Sinh TSID mới dưới dạng Long
    }

    private static final Pattern emailPattern = Pattern.compile(MyPattern.EMAIL_PATTERN);

    public static boolean isEmptyOrNull(Object o) {
        if(o == null) {
            return true;
        } else return o.toString().trim().isEmpty();
    }

    public static boolean isNullObject(Object o) {
        return o == null;
    }

    public static boolean isEmail(String email) {
        if(isEmptyOrNull(email)) return false;

        Matcher matcher = emailPattern.matcher(email);
        return matcher.matches();
    }
}

