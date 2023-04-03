package com.roller.doc.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.service.drug.DrugService;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/drug")
public class DrugController {
	private final DrugService drugService;

	/**
	 * 이름으로 의약품 검색
	 */
	@GetMapping("/name/{drugName}")
	public ResponseEntity getName(@PathVariable("drugName") String drugName) throws Exception {
		ResponseDTO result = drugService.findOneByName(drugName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	/**
	 * 조건으로 의약품 검색
	 */
	@GetMapping("/result/{drugType}/{drugLine}/{drugColor}/{drugMark}")
	public ResponseEntity getDrug(@PathVariable("drugType")String drugType, @PathVariable("drugLine")String drugLine,
		@PathVariable("drugColor")String drugColor, @PathVariable("drugMark")String drugMark) throws Exception {
		ResponseDTO result = drugService.findDrug(drugType, drugLine, drugColor, drugMark);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	/**
	 * drugId로 의약품 상세정보 출력(drug)
	 */
	@GetMapping("/info/{drugId}")
	public ResponseEntity selectDrug(@PathVariable("drugId") Long drugId) throws Exception {
		ResponseDTO result = drugService.selectDrug(Long.valueOf(drugId));
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	/**
	 * drugId로 의약품 상세정보 출력(drug_desc)
	 */
	@GetMapping("/descinfo/{drugId}")
	public ResponseEntity selectDrugDesc(@PathVariable("drugId") int drugId) throws Exception {
		ResponseDTO result = drugService.selectDrugDesc(drugId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	/**
	 * drugId로 의약품 상세정보 출력(drug_avoid)
	 */
	@GetMapping("/avoidinfo/{drugId}")
	public ResponseEntity selectDrugAvoid(@PathVariable("drugId") Long drugId) throws Exception {
		ResponseDTO result = drugService.selectDrugAvoid(Long.valueOf(drugId));
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
