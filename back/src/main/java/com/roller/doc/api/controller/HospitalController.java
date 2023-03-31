package com.roller.doc.api.controller;

import com.roller.doc.api.request.HospitalFilterReq;
import com.roller.doc.api.request.HospitalMyReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.hospital.HospitalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;

@Log4j2
@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class HospitalController {
    private HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

//    /** 연결 테스트*/
//    @GetMapping("/test/{word}")
//    public ResponseEntity test(@PathVariable("word") String word) {
//        return ResponseEntity.status(HttpStatus.OK).body(word);
//    }

    /**
     * 이름으로 병원 검색
     */
    @GetMapping("/search/{word}")
    public ResponseEntity searchByWord(@PathVariable("word") String word, @RequestParam double e, @RequestParam double w, @RequestParam double s, @RequestParam double n) {
        ResponseDTO responseDTO = hospitalService.searchByHospitalName(word, e, w, s, n);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * 병원 상세보기
     */
    @GetMapping("/desc/{id}")
    public ResponseEntity findHospitalDetail(@PathVariable("id") int id) {
        ResponseDTO responseDTO = hospitalService.detailedHospital(id);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * 필터를 통한 병원검색
     */
    @PostMapping("/find")
    public ResponseEntity filteringHospital(@RequestBody HospitalFilterReq h) {
        ResponseDTO responseDTO = hospitalService.filteringHospital(h.getE(), h.getW(), h.getS(), h.getN(),
                h.getPart(),h.getOpen());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }


}
