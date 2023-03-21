package com.roller.doc.api.service.hospital;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.hospital.HospitalDescRes;
import com.roller.doc.api.response.hospital.HospitalRes;

public interface HospitalService {
	ResponseDTO searchHospital(); //병원이름으로 검색
	ResponseDTO filteredHospital(); //병원 필터로 검색

	ResponseDTO detailedHospital(); //병원 상세보기


}
