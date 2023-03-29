package com.roller.doc.api.service.drug;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugAvoidRes;
import com.roller.doc.api.response.drug.DrugDescRes;
import com.roller.doc.api.response.drug.DrugMyPillRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.response.drug.DrugRes;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugAvoid;
import com.roller.doc.db.entity.DrugDesc;
import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.DrugMyPill;
import com.roller.doc.db.repository.DrugAvoidRepository;
import com.roller.doc.db.repository.DrugDescRepository;
import com.roller.doc.db.repository.DrugMyPillRepository;
import com.roller.doc.db.repository.DrugMyRepository;
import com.roller.doc.db.repository.DrugRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DrugServiceImpl implements DrugService {

	private final DrugRepository drugRepository;
	private final DrugAvoidRepository drugAvoidRepository;
	private final DrugDescRepository drugDescRepository;

	private final DrugMyRepository drugMyRepository;
	private final DrugMyPillRepository drugMyPillRepository;

	@Override
	public ResponseDTO findOneByName(String drug_name) throws Exception {
		DrugRes drugRes = new DrugRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			List<Drug> drug = drugRepository.findOneByName(drug_name);

			if (drug == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drug);
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

		DrugRes drugRes = new DrugRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {

			List<Drug> drug = drugRepository.findDrug(drug_type, drug_line, drug_color, drug_mark);

			if (drug == null) {
				responseDTO.setMessage("검색 값이 없습니다");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drug);
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
		DrugRes drugRes = new DrugRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			Drug drug = drugRepository.selectDrug(drug_id);

			if (drug == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drug);
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
		DrugDescRes drugDescRes = new DrugDescRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			DrugDesc drugDesc = drugDescRepository.selectDrugDesc(drug_id);

			if (drugDesc == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drugDesc);
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
		DrugAvoidRes drugAvoidRes = new DrugAvoidRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			List<DrugAvoid> drugAvoid = drugAvoidRepository.selectDrugAvoid(drug_id);

			if (drugAvoid == null) {
				// responseDTO.setData(drug);
				responseDTO.setMessage("검색 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drugAvoid);
				responseDTO.setMessage("약 검색 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO findList(Long user_id) throws Exception {
		DrugMyRes drugMyRes = new DrugMyRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			List<DrugMy> drugMIES = drugMyRepository.findList(user_id);
			if (drugMIES == null) {
				responseDTO.setMessage("출력 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drugMIES);
				responseDTO.setMessage("나의 약봉지 목록 출력 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}

	@Override
	public ResponseDTO findMyPillList(Long drug_my_id) throws Exception {
		DrugMyPillRes drugMyPillRes = new DrugMyPillRes();
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			List<DrugMyPill> drugMyPills = drugMyPillRepository.findMyPillList(drug_my_id);
			if (drugMyPills == null) {
				responseDTO.setMessage("출력 실패");
				responseDTO.setStatus_code(400);
			}
			else {
				responseDTO.setData(drugMyPills);
				responseDTO.setMessage("나의 약봉지 속 약 출력 성공");
				responseDTO.setStatus_code(200);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseDTO;
	}
}
