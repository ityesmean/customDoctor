package com.roller.doc.api.controller;

import com.roller.doc.api.request.HospitalFilter;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.hospital.HospitalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/hospital")
public class HospitalController {
    private  HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    /** 연결 테스트*/
    @GetMapping("/test/{word}")
    public ResponseEntity test(@PathVariable("word") String word) {
        return ResponseEntity.status(HttpStatus.OK).body(word);
    }
    /** 이름으로 병원 검색*/
    @GetMapping("/search/{word}")
    public ResponseEntity searchByWord(@PathVariable("word") String word) {
        ResponseDTO responseDTO = hospitalService.searchByHospitalName(word);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
    /** 병원 상세보기*/
    @GetMapping("/desc/{id}")
    public  ResponseEntity findHospitalDetail(@PathVariable("id") int id){
        ResponseDTO responseDTO = hospitalService.detailedHospital(id);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
    /** 필터를 통한 병원검색*/
    @GetMapping("/find")
    public ResponseEntity filteringHospital(@RequestBody HospitalFilter hospitalFilter){
        ResponseDTO responseDTO=hospitalService.filteringHospital(hospitalFilter.getE(), hospitalFilter.getW(), hospitalFilter.getS(), hospitalFilter.getN(), hospitalFilter.getPart());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
