package com.roller.doc.api.request;

import lombok.Data;

@Data
public class HospitalFilterReq {
    private double e;
    private double w;
    private double s;
    private double n;
    private int part;
    private int sat;
    private int sun;
    private int holiday;
    private int night;
}
