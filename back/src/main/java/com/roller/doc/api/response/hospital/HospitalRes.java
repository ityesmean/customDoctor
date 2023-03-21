package com.roller.doc.api.response.hospital;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HospitalRes {
    private int hospitalId; //병원 고유id
    private int hospitalIndex; //지역코드
    private String hospitalName; //병원이름
    private String hospitalCode; //병원분류
    private String hospitalTel; // 전화번호
    private double hospitalStar; //별점

    @Builder
    public HospitalRes(int hospitalId, int hospitalIndex, String hospitalName, String hospitalCode, String hospitalTel, double hospitalStar) {
        this.hospitalId = hospitalId;
        this.hospitalIndex = hospitalIndex;
        this.hospitalName = hospitalName;
        this.hospitalCode = hospitalCode;
        this.hospitalTel = hospitalTel;
        this.hospitalStar = hospitalStar;
    }
}



