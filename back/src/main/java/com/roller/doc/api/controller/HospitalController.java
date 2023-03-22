package com.roller.doc.api.controller;

import com.roller.doc.api.request.SearchByWordReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.hospital.HospitalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/hospital")
@Log4j2
public class HospitalController {
    private  HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.status(HttpStatus.OK).body("안녕");
    }

    @GetMapping("/search/{word}")
    public ResponseEntity searchByWord(@PathVariable("word") String word, @RequestBody SearchByWordReq searchByWordReq) {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO = hospitalService.searchByHospitalName(word, searchByWordReq.getX(), searchByWordReq.getY());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
