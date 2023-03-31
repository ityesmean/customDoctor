package com.roller.doc.api.service.hospital;

import com.roller.doc.api.request.HospitalMyReq;
import com.roller.doc.api.response.ResponseDTO;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface HospitalService {
    /**
     * 병원이름으로 검색
     */
    ResponseDTO searchByHospitalName(String word, double e, double w, double s, double n);

    /**
     * 필터로 병원검색
     */
    ResponseDTO filteringHospital(double e, double w, double s, double n, List<Integer> part, List<Integer>open);

    /**
     * 병원 상세보기
     */
    ResponseDTO detailedHospital(long id);

    /**
     * 즐겨찾는 병원 등록
     */
    ResponseDTO addHospitalMy(long userId, long hospitalId);

    /**
     * 즐겨찾기 병원 삭제
     */
    ResponseDTO deleteHospitalMy(long userId, long hospitalId);

    /**
     * 즐겨찾기 여부
     */
    ResponseDTO isHospitalMy(long userId, long hospitalId);

    /**
     * 병원 즐겨찾기 리스트
     */
    ResponseDTO listHospitalMy(long userId);
}
