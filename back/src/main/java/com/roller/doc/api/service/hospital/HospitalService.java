package com.roller.doc.api.service.hospital;

import com.roller.doc.api.request.HospitalFilterReq;
import com.roller.doc.api.request.HospitalSearchReq;
import com.roller.doc.api.response.ResponseDTO;

import java.util.List;

public interface HospitalService {
    /**
     * 병원이름으로 검색
     */
    ResponseDTO searchByHospitalName(String word, HospitalSearchReq hospitalSearchReq);

    /**
     * 필터로 병원검색
     */
    ResponseDTO filteringHospital(HospitalFilterReq hospitalFilterReq);

    /**
     * 병원 상세보기
     */
    ResponseDTO detailedHospital(long id);

}
