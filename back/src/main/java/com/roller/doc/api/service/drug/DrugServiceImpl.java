package com.roller.doc.api.service.drug;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.roller.doc.api.service.auth.TokenService;
import com.roller.doc.db.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugAvoidRes;
import com.roller.doc.api.response.drug.DrugDescRes;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyPillRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.response.drug.DrugRes;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugAvoid;
import com.roller.doc.db.entity.DrugDesc;
import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.DrugMyPill;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class DrugServiceImpl implements DrugService {

	private final DrugRepository drugRepository;
	private final DrugAvoidRepository drugAvoidRepository;
	private final DrugDescRepository drugDescRepository;

	@Override
	public ResponseDTO findOneByName(String drug_name) throws Exception {

		ResponseDTO responseDTO = new ResponseDTO();
		List<DrugRes> result = new ArrayList<>();
		try {
			List<Drug> drug = drugRepository.findOneByName(drug_name);

			if (drug == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				for (int i = 0; i < drug.size(); i++) {
					DrugRes drugRes = DrugRes.builder()
						.drugId(drug.get(i).getDrug_id())
						.drugName(drug.get(i).getDrug_name())
						.drugImg(drug.get(i).getDrug_img())
						.drugMarkf(drug.get(i).getDrug_markf())
						.drugMarkb(drug.get(i).getDrug_markb())
						.drugType(drug.get(i).getDrug_type())
						.drugColorf(drug.get(i).getDrug_colorf())
						.drugColorb(drug.get(i).getDrug_colorb())
						.drugLine(drug.get(i).getDrug_line())
						.drugIngre(drug.get(i).getDrug_ingre())
						.build();
					result.add(drugRes);
				}

				responseDTO.setData(result);
				responseDTO.setMessage("약 이름으로 검색 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO findDrug(String drug_type, String drug_line, String drug_color,
		String drug_mark) throws Exception {

		List<DrugRes> result = new ArrayList<>();
		ResponseDTO responseDTO = new ResponseDTO();

		try {

			List<Drug> drug = null;

			if (drug_line.equals("a")) {
				drug = drugRepository.findA(drug_type, drug_color, drug_mark);
			} else if (drug_line.equals("b")) {
				drug = drugRepository.findB(drug_type, drug_color, drug_mark);
			} else if (drug_line.equals("c")) {
				drug = drugRepository.findC(drug_type, drug_color, drug_mark);
			} else if (drug_line.equals("d")) {
				drug = drugRepository.findD(drug_type, drug_color, drug_mark);
			} else if (drug_line.equals("e")) {
				drug = drugRepository.findE(drug_type, drug_color, drug_mark);
			}

			if (drug == null) {
				responseDTO.setMessage("검색 값이 없습니다");
				responseDTO.setStatus_code(400);
			}
			else {
				for (int i = 0; i < drug.size(); i++) {
					DrugRes drugRes = DrugRes.builder()
						.drugId(drug.get(i).getDrug_id())
						.drugName(drug.get(i).getDrug_name())
						.drugImg(drug.get(i).getDrug_img())
						.drugMarkf(drug.get(i).getDrug_markf())
						.drugMarkb(drug.get(i).getDrug_markb())
						.drugType(drug.get(i).getDrug_type())
						.drugColorf(drug.get(i).getDrug_colorf())
						.drugColorb(drug.get(i).getDrug_colorb())
						.drugLine(drug.get(i).getDrug_line())
						.drugIngre(drug.get(i).getDrug_ingre())
						.build();
					result.add(drugRes);
				}
				responseDTO.setData(result);
				responseDTO.setMessage("약 조건으로 검색 성공");
				responseDTO.setStatus_code(200);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO selectDrug(Long drug_id) throws Exception {
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			Drug drug = drugRepository.selectDrug(drug_id);

			if (drug == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				DrugRes drugRes = DrugRes.builder()
					.drugId(drug.getDrug_id())
					.drugName(drug.getDrug_name())
					.drugImg(drug.getDrug_img())
					.drugMarkf(drug.getDrug_markf())
					.drugMarkb(drug.getDrug_markb())
					.drugType(drug.getDrug_type())
					.drugColorf(drug.getDrug_colorf())
					.drugColorb(drug.getDrug_colorb())
					.drugLine(drug.getDrug_line())
					.drugIngre(drug.getDrug_ingre())
					.build();

				responseDTO.setData(drugRes);
				responseDTO.setMessage("약 검색 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO selectDrugDesc(int drug_id) throws Exception {
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			DrugDesc drugDesc = drugDescRepository.selectDrugDesc(drug_id);

			if (drugDesc == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				DrugDescRes drugDescRes = DrugDescRes.builder()
					.drugId(drugDesc.getDrug_id())
					.drugDescCat(drugDesc.getDrug_desc_cat())
					.drugDescShape(drugDesc.getDrug_desc_shape())
					.drugDescCom(drugDesc.getDrug_desc_com())
					.drugDescSafety(drugDesc.getDrug_desc_safety())
					.drugDescEffect(drugDesc.getDrug_desc_effect())
					.drugDescUse(drugDesc.getDrug_desc_use())
					.build();

				responseDTO.setData(drugDescRes);
				responseDTO.setMessage("약 상세정보 검색 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO selectDrugAvoid(Long drug_id) throws Exception {
		List<DrugAvoidRes> result = new ArrayList<>();
		ResponseDTO responseDTO = new ResponseDTO();
		try {
			List<DrugAvoid> drugAvoid = drugAvoidRepository.selectDrugAvoid(drug_id);

			if (drugAvoid == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				for (int i = 0; i < drugAvoid.size(); i++) {
					DrugAvoidRes drugAvoidRes = DrugAvoidRes.builder()
						.drugAvoidId(drugAvoid.get(i).getDrug_avoid_id())
						.drugId(drug_id)
						.drugAvoidB(drugAvoid.get(i).getDrug_avoid_b())
						.drugAvoidNameB(drugAvoid.get(i).getDrug_avoid_name_b())
						.drugAvoidDesc(drugAvoid.get(i).getDrug_avoid_desc())
						.build();
					result.add(drugAvoidRes);
				}

				responseDTO.setData(result);
				responseDTO.setMessage("약 검색 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}
}
