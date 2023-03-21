package com.roller.doc.api.response.hospital;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class HospitalDescRes {
    private int hospitalId;
    private String hospitalName;
    private String hospitalTel;
    private double hospitalStar;
    private String hospitalAdd; //주소
    private int hospitalParking; //주차 대수
    private String hospitalDevice; //의료장비
    private String hospitalSpecial; //특수진료
    private List<String> hospitalPartName; //진료 과목
    private List<Integer> hospitalPartDoctor; //과목의 전문의수
    private List<String> hospitalTime; //진료시간

    @Builder
    public HospitalDescRes(int hospitalId, String hospitalName, String hospitalTel, double hospitalStar,
        String hospitalAdd,
        int hospitalParking, String hospitalDevice, String hospitalSpecial, List<String> hospitalPartName,
        List<Integer> hospitalPartDoctor, List<String> hospitalTime) {
        this.hospitalId = hospitalId;
        this.hospitalName = hospitalName;
        this.hospitalTel = hospitalTel;
        this.hospitalStar = hospitalStar;
        this.hospitalAdd = hospitalAdd;
        this.hospitalParking = hospitalParking;
        this.hospitalDevice = hospitalDevice;
        this.hospitalSpecial = hospitalSpecial;
        this.hospitalPartName = hospitalPartName;
        this.hospitalPartDoctor = hospitalPartDoctor;
        this.hospitalTime = hospitalTime;
    }
}

