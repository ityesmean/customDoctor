package com.roller.doc.api.service.hospital;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.hospital.HospitalDescRes;
import com.roller.doc.api.response.hospital.HospitalRes;

public interface HospitalService {
    ResponseDTO searchByHospitalName(String word, double x, double y); //병원이름으로 검색

    ResponseDTO searchByHospitalLocation(double x, double y, int d); //거리로 검색

    ResponseDTO detailedHospital(int id); //병원 상세보기


}
