package com.roller.doc.api.response.hospital;

import java.util.List;

import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalPart;
import com.roller.doc.db.entity.HospitalTime;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HospitalRes {
    private long hospitalId; //병원 고유id
    private String hospitalName; //병원이름
    private String hospitalCode; //병원분류
    private String hospitalTel; // 전화번호
    private double hospitalX; //경도
    private double hospitalY; //위도
    private HospitalTime hospitalTime; //진료시간
    private List<String> hospitalPart; //진료과목

    @Builder
    public HospitalRes(long hospitalId, String hospitalName, String hospitalCode, String hospitalTel,
                       double hospitalX, double hospitalY, HospitalTime hospitalTime, List<String> hospitalPart) {
        this.hospitalId = hospitalId;
        this.hospitalName = hospitalName;
        this.hospitalCode = hospitalCode;
        this.hospitalTel = hospitalTel;
        this.hospitalX = hospitalX;
        this.hospitalY = hospitalY;
        this.hospitalTime = hospitalTime;
        this.hospitalPart = hospitalPart;
    }
}



