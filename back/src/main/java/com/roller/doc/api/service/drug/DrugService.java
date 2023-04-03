package com.roller.doc.api.service.drug;

import com.roller.doc.api.response.ResponseDTO;

public interface DrugService {
	/**
	 * 이름으로 의약품 검색
	 */
	ResponseDTO findOneByName(String drug_name) throws Exception;

	/**
	 * 조건으로 의약품 검색
	 */
	ResponseDTO findDrug(String drug_type, String drug_line, String drug_color, String drug_mark) throws Exception;

	/**
	 * drugId로 의약품 상세정보 출력(drug)
	 */
	ResponseDTO selectDrug(Long drug_id) throws Exception;

	/**
	 * drugId로 의약품 상세정보 출력(drug_desc)
	 */
	ResponseDTO selectDrugDesc(int drug_id) throws Exception;

	/**
	 * drugId로 의약품 상세정보 출력(drug_avoid)
	 */
	ResponseDTO selectDrugAvoid(Long drug_id) throws Exception;
	}
