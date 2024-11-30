package com.vvh.vnua_test.utils;

import com.vvh.vnua_test.exception.LogicException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public static final String ddMMyyyyHHmmss = "dd-MM-yyyy HH:mm:ss";
    public static final String ddMMyyyyHHmm = "dd-MM-yyyy HH:mm";
    public static final String ddMMyyyy = "dd-MM-yyyy";
    public static final String ddMMyyyy2 = "dd/MM/yyyy";

    private static final DateTimeFormatter DEFAULT_DATE_FORMATTER = DateTimeFormatter.ofPattern(ddMMyyyy);
    private static final DateTimeFormatter DEFAULT_DATETIME_FORMATTER = DateTimeFormatter.ofPattern(ddMMyyyyHHmmss);

    // Lay ngay hien tai
    public static Date getCurrentDate() {
        return new Date();
    }

    public static Date stringToDate(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat(ddMMyyyy);
        try {
            return formatter.parse(date);
        } catch (ParseException e) {
            throw new LogicException("STD2DDMMYYYY00001", "date.parse.failed");
        }
    }

    public static Date stringToDateTime(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat(ddMMyyyyHHmmss);
        try {
            return formatter.parse(date);
        } catch (ParseException e) {
            throw new LogicException("STD2DDMMYYYY00001", "date.parse.failed");
        }
    }

    public static java.sql.Date stringToDateSQL(String date, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        try {
            Date dateUtil = formatter.parse(date);
            return new java.sql.Date(dateUtil.getTime());
        } catch (ParseException e) {
            throw new LogicException("STD2DDMMYYYY00001", "date.parse.failed");
        }
    }

    public static String dateToString(Date date, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        return formatter.format(date);
    }

    public static Date addDays(Date date, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, days);
        return calendar.getTime();
    }

    public static Date addMonths(Date date, int months) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, months);
        return calendar.getTime();
    }

    public static Date addYears(Date date, int years) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, years);
        return calendar.getTime();
    }

    public static Date addWeeks(Date date, int weeks) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.WEEK_OF_YEAR, weeks);
        return calendar.getTime();
    }

    public static Date addHours(Date date, int hours) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, hours);
        return calendar.getTime();
    }

    // Lay khoang cach giua 2 ngay
    public static long daysBetween(Date startDate, Date endDate) {
        long diff = endDate.getTime() - startDate.getTime();
        return diff / (24 * 60 * 60 * 1000);
    }

    // Kiem tra nam nhuan
    public static boolean isLeapYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int year = calendar.get(Calendar.YEAR);
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    // Lay ngay dau tien cua thang
    public static Date getFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return calendar.getTime();
    }

    // Lay ngay cuoi cung cua thang
    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        return calendar.getTime();
    }

    // Kiem tra 1 ngay co nam trong khoang ngay
    public static boolean isDateInRange(Date date, Date startDate, Date endDate) {
        return date.compareTo(startDate) >= 0 && date.compareTo(endDate) <= 0;
    }

    // Lay thoi gian bat dau trong ngay
    public static Date getStartOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    // Lay thoi gian ket thuc trong ngay
    public static Date getEndOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }
}
