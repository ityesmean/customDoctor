package com.roller.doc.api.request;

import lombok.Data;

@Data
public class HospitalMyStatusReq {
    private long hospitalId;
    private boolean status;
}
