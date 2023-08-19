package com.example.back.config;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateConfig {
    private static DateConfig DateConfig = new DateConfig();
    public static DateConfig getDateConfigure() {
        return DateConfig;
    }

    public String nowDate() {
        Date date = new Date();
        SimpleDateFormat simpl = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        String dat = simpl.format(date);
        return dat;
    }
}
