package com.roller.doc.api.controller;

import com.roller.doc.api.request.HospitalMyReq;
import com.roller.doc.api.request.HospitalMyStatusReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.service.User.UserService;
import com.roller.doc.api.service.drug.DrugService;
import com.roller.doc.util.HeaderUtil;

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

    @GetMapping("/my")
    public ResponseEntity findList(@RequestHeader String Authorization) throws Exception {
        String token = HeaderUtil.getAccessTokenString(Authorization);

        ResponseDTO result = userService.findList(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/mypill/{drugMyId}")
    public ResponseEntity findPillList(@PathVariable("drugMyId") Long drugMyId) throws Exception {
        ResponseDTO result = userService.findMyPillList(drugMyId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping("/delete/{drugMyId}")
    public ResponseEntity deleteDrugMy(@PathVariable("drugMyId") Long drugMyId) throws Exception {
        ResponseDTO result = userService.deleteDrugMy(drugMyId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/plus")
    private ResponseEntity createDrugMy(@RequestBody DrugMyCreateRes drugMyCreateRes) throws Exception {
        DrugMyRes result = userService.createDrugMy(drugMyCreateRes);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
