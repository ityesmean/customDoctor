package com.roller.doc.api.service.drug;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyPillRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.response.drug.DrugRes;

public interface DrugService {
	ResponseDTO findOneByName(String drug_name) throws Exception;

	ResponseDTO findDrug(String drug_type, String drug_line, String drug_color, String drug_mark) throws Exception;

	ResponseDTO selectDrug(Long drug_id) throws Exception;

	ResponseDTO selectDrugDesc(int drug_id) throws Exception;

	ResponseDTO selectDrugAvoid(Long drug_id) throws Exception;
	}
