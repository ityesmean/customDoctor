package com.roller.doc.api.request;

import lombok.Data;

@Data
public class HospitalMyListReq {
    private int hour;
    private int min;
    private int day;
}
