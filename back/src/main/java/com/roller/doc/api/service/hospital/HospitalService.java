package com.roller.doc.api.service.hospital;

import com.roller.doc.api.response.ResponseDTO;

public interface HospitalService {
    /**
     * 병원이름으로 검색
     */
    ResponseDTO searchByHospitalName(String word, double e, double w, double s, double n);

    /**
     * 필터로 병원검색
     */
    ResponseDTO filteringHospital(double e, double w, double s, double n, int part,int sat, int sun, int holiday, int night);

    /**
     * 병원 상세보기
     */
    ResponseDTO detailedHospital(long id);

}
