package com.roller.doc.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.response.drug.DrugRes;
import com.roller.doc.api.service.drug.DrugService;
import com.roller.doc.db.entity.DrugMy;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/drug")
public class DrugController {
	private final DrugService drugService;

	@GetMapping("/name/{drugName}")
	public ResponseEntity getName(@PathVariable("drugName") String drugName) throws Exception {
		ResponseDTO result = drugService.findOneByName(drugName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/result/{drugType}/{drugLine}/{drugColor}/{drugMark}")
	public ResponseEntity getDrug(@PathVariable("drugType")String drugType, @PathVariable("drugLine")String drugLine,
		@PathVariable("drugColor")String drugColor, @PathVariable("drugMark")String drugMark) throws Exception {
		ResponseDTO result = drugService.findDrug(drugType, drugLine, drugColor, drugMark);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/info/{drugId}")
	public ResponseEntity selectDrug(@PathVariable("drugId") Long drugId) throws Exception {
		ResponseDTO result = drugService.selectDrug(Long.valueOf(drugId));
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/descinfo/{drugId}")
	public ResponseEntity selectDrugDesc(@PathVariable("drugId") int drugId) throws Exception {
		ResponseDTO result = drugService.selectDrugDesc(drugId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/avoidinfo/{drugId}")
	public ResponseEntity selectDrugAvoid(@PathVariable("drugId") Long drugId) throws Exception {
		ResponseDTO result = drugService.selectDrugAvoid(Long.valueOf(drugId));
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/my")
	public ResponseEntity findList(@PathVariable("userId") Long userId) throws Exception {
		ResponseDTO result = drugService.findList(userId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/mypill/{drugMyId}")
	public ResponseEntity findPillList(@PathVariable("drugMyId") Long drugMyId) throws Exception {
		ResponseDTO result = drugService.findMyPillList(drugMyId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PutMapping("/delete/{drugMyId}")
	public ResponseEntity deleteDrugMy(@PathVariable("drugMyId") Long drugMyId) throws Exception {
		ResponseDTO result = drugService.deleteDrugMy(drugMyId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PostMapping("/plus")
	private ResponseEntity createDrugMy(@RequestBody DrugMyCreateRes drugMyCreateRes) throws Exception {
		DrugMyRes result = drugService.createDrugMy(drugMyCreateRes);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
