package com.roller.doc.api.controller;

import com.roller.doc.api.request.HospitalMyReq;
import com.roller.doc.api.request.HospitalMyStatusReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.User.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 즐겨찾는 병원 상태변경
     */
    @PutMapping("/hospital/statusmark")
    public ResponseEntity deleteHospitalMy(@RequestBody HospitalMyStatusReq hospitalMyStatusReq) {
        ResponseDTO responseDTO = userService.statusHospitalMy(hospitalMyStatusReq.getUserId(), hospitalMyStatusReq.getHospitalId(), hospitalMyStatusReq.isStatus());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * 즐겨찾기 여부
     */
    @PostMapping("hospital/ismark")
    public ResponseEntity isHospitalMy(@RequestBody HospitalMyReq hospitalMyReq) {
        ResponseDTO responseDTO = userService.isHospitalMy(hospitalMyReq.getUserId(), hospitalMyReq.getHospitalId());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * 즐겨찾기 리스트
     */
    @PostMapping("/hospital/marklist")
    public ResponseEntity listHospitalMy(@RequestBody HospitalMyReq hospitalMyReq) {
        ResponseDTO responseDTO = userService.listHospitalMy(hospitalMyReq.getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
