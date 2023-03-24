package com.roller.doc.api.response.hospital;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class HospitalDescRes {
    private long hospitalId;
    private String hospitalAdd; //주소
    private int hospitalParking; //주차 대수
    private String hospitalDevice; //의료장비
    private String hospitalSpecial; //특수진료
    @Builder
    public HospitalDescRes(long hospitalId, String hospitalAdd, int hospitalParking, String hospitalDevice,
                           String hospitalSpecial) {
        this.hospitalId = hospitalId;
        this.hospitalAdd = hospitalAdd;
        this.hospitalParking = hospitalParking;
        this.hospitalDevice = hospitalDevice;
        this.hospitalSpecial = hospitalSpecial;
    }
}

