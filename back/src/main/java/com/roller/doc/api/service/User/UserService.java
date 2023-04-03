package com.roller.doc.api.service.User;

import com.roller.doc.api.request.HospitalMyListReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyRes;

public interface UserService {

    /**
     * 즐겨찾기 병원 상태변경
     */
    ResponseDTO statusHospitalMy(String token, long hospitalId, boolean status);

    /**
     * 즐겨찾기 여부
     */
    ResponseDTO isHospitalMy(String token, long hospitalId);

    /**
     * 병원 즐겨찾기 리스트
     */
    ResponseDTO listHospitalMy(String token, HospitalMyListReq hospitalMyListReq);

    ResponseDTO findList(String token) throws Exception;

    ResponseDTO findMyPillList(Long drug_my_id) throws Exception;

    ResponseDTO deleteDrugMy(Long drug_my_id) throws Exception;

    DrugMyRes createDrugMy(String token, DrugMyCreateRes drugMyCreateRes) throws Exception;

}
