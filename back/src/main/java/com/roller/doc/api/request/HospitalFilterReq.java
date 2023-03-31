package com.roller.doc.api.request;

import lombok.Data;

import java.util.List;

@Data
public class HospitalFilterReq {
    private double e;
    private double w;
    private double s;
    private double n;
    private List<Integer> part;
    private List<Integer> open;
}
