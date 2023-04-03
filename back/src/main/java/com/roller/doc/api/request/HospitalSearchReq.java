package com.roller.doc.api.request;

import lombok.Data;

@Data
public class HospitalSearchReq {
    private double e;
    private double w;
    private double s;
    private double n;
    private int hour;
    private int min;
    private int day;
}
