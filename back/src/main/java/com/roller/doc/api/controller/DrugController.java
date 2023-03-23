package com.roller.doc.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugRes;
import com.roller.doc.api.service.drug.DrugService;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/drug")
public class DrugController {
	private final DrugService drugService;

	@GetMapping("/{drugName}")
	public ResponseEntity<?> getName(@PathVariable("drugName") String drugName) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();

		ResponseDTO result = drugService.findOneByName(drugName);

		map.put("data", result);

		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@GetMapping("/{drugType}/{drugLine}/{drugColor}/{drugMark}")
	public ResponseEntity<?> getDrug(@PathVariable("drugType")String drugType, @PathVariable("drugLine")String drugLine,
		@PathVariable("drugColor")String drugColor, @PathVariable("drugMark")String drugMark) throws Exception {

		Map<String, Object> map = new HashMap<String, Object>();

		ResponseDTO result = drugService.findDrug(drugType, drugLine, drugColor, drugMark);

		map.put("data", result);

		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
}
