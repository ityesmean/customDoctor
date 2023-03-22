package com.roller.doc.api.response.hospital;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HospitalRes {
    private int hospitalId; //병원 고유id
    private String hospitalName; //병원이름
    private String hospitalCode; //병원분류
    private String hospitalTel; // 전화번호
    private double hospitalStar; //별점
    private List<String> hospitalTime; //진료시간
    private List<String> hospitalPart; //진료과목
    private int hospitalDistance; //병원까지의 거리

    @Builder

    public HospitalRes(int hospitalId, String hospitalName, String hospitalCode, String hospitalTel, double hospitalStar,
                       List<String> hospitalTime, List<String> hospitalPart, int hospitalDistance) {
        this.hospitalId = hospitalId;
        this.hospitalName = hospitalName;
        this.hospitalCode = hospitalCode;
        this.hospitalTel = hospitalTel;
        this.hospitalStar = hospitalStar;
        this.hospitalTime = hospitalTime;
        this.hospitalPart = hospitalPart;
        this.hospitalDistance = hospitalDistance;
    }
}



