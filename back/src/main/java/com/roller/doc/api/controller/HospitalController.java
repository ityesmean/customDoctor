package com.roller.doc.api.controller;

import com.roller.doc.api.request.SearchByWordReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.hospital.HospitalService;
import org.springframework.http.HttpHeaders;
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

    @GetMapping("/test/{word}")
    public ResponseEntity test(@PathVariable("word") String word) {
        return ResponseEntity.status(HttpStatus.OK).body(word);
    }

    @GetMapping("/search/{word}")
    public ResponseEntity searchByWord(@PathVariable("word") String word) {
        ResponseDTO responseDTO = hospitalService.searchByHospitalName(word);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @GetMapping("/desc/{id}")
    public  ResponseEntity findHospitalDetail(@PathVariable("id") int id){
        ResponseDTO responseDTO = hospitalService.detailedHospital(id);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
