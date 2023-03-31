package com.roller.doc.api.service.User;

import com.roller.doc.api.response.ResponseDTO;

public interface UserService {

    /**
     * 즐겨찾기 병원 상태변경
     */
    ResponseDTO statusHospitalMy(long userId, long hospitalId, boolean status);

    /**
     * 즐겨찾기 여부
     */
    ResponseDTO isHospitalMy(long userId, long hospitalId);

    /**
     * 병원 즐겨찾기 리스트
     */
    ResponseDTO listHospitalMy(long userId);

}
