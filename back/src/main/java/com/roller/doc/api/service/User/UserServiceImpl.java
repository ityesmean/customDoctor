package com.roller.doc.api.service.User;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.drug.DrugMyCreateRes;
import com.roller.doc.api.response.drug.DrugMyPillRes;
import com.roller.doc.api.response.drug.DrugMyRes;
import com.roller.doc.api.response.hospital.HospitalRes;
import com.roller.doc.api.service.auth.TokenService;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.DrugMyPill;
import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalMy;
import com.roller.doc.db.entity.HospitalPart;
import com.roller.doc.db.repository.DrugAvoidRepository;
import com.roller.doc.db.repository.DrugDescRepository;
import com.roller.doc.db.repository.DrugMyPillRepository;
import com.roller.doc.db.repository.DrugMyRepository;
import com.roller.doc.db.repository.DrugRepository;
import com.roller.doc.db.repository.HospitalMyRepository;
import com.roller.doc.db.repository.HospitalRepository;
import com.roller.doc.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@Transactional
public class UserServiceImpl implements UserService {
    private final HospitalMyRepository hospitalMyRepository;
    private final HospitalRepository hospitalRepository;

    private final DrugRepository drugRepository;
    private final DrugMyRepository drugMyRepository;
    private final DrugMyPillRepository drugMyPillRepository;

    private final TokenService tokenService;

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(HospitalMyRepository hospitalMyRepository, HospitalRepository hospitalRepository,
        DrugRepository drugRepository, DrugMyRepository drugMyRepository, DrugMyPillRepository drugMyPillRepository,
        TokenService tokenService, UserRepository userRepository) {
        this.hospitalMyRepository = hospitalMyRepository;
        this.hospitalRepository = hospitalRepository;
        this.drugRepository = drugRepository;
        this.drugMyRepository = drugMyRepository;
        this.drugMyPillRepository = drugMyPillRepository;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    /**
     * 병원 즐겨찾기 상태변경
     */
    @Override
    @Transactional
    public ResponseDTO statusHospitalMy(long userId, long hospitalId, boolean status) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Optional<HospitalMy> isMy = hospitalMyRepository.findHospitalMy(userId, hospitalId);
            if (isMy.isEmpty()) { //등록된적이 없으면 신규등록
                HospitalMy hospitalMy = HospitalMy.builder()
                        .hospital_id(hospitalId)
                        .user_id(userId)
                        .hospital_my_del(false)
                        .build();
                hospitalMyRepository.save(hospitalMy);
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("병원 즐겨찾기 신규 등록 완료");
                responseDTO.setData(true);
            } else { //이미 등록이 되어있는 경우
                if (status) { //즐겨찾기 되어있는것 삭제
                    hospitalMyRepository.statusHospitalMy(userId, hospitalId, status);
                    responseDTO.setStatus_code(200);
                    responseDTO.setMessage("병원 즐겨찾기 삭제 완료");
                    responseDTO.setData(false);
                } else { //다시 즐겨찾기 만들기
                    hospitalMyRepository.statusHospitalMy(userId, hospitalId, status);
                    responseDTO.setStatus_code(200);
                    responseDTO.setMessage("병원 즐겨찾기 등록 완료");
                    responseDTO.setData(true);
                }
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            exception.printStackTrace();
        }
        return responseDTO;
    }

    /**
     * 병원 즐겨찾기 여부
     */
    @Override
    public ResponseDTO isHospitalMy(long userId, long hospitalId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Optional<HospitalMy> isMy = hospitalMyRepository.isHospitalMy(userId, hospitalId);
            if (isMy.isEmpty()) {
                responseDTO.setStatus_code(204);
                responseDTO.setMessage("즐겨찾기한 병원이 아닙니다.");
                responseDTO.setData(false);
            } else {
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("즐겨찾기한 병원입니다.");
                responseDTO.setData(true);
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            exception.printStackTrace();
        }
        return responseDTO;
    }

    /**
     * 병원 즐겨찾기 리스트
     */
    @Override
    public ResponseDTO listHospitalMy(long userId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<HospitalMy> myList = hospitalMyRepository.listingHospitalMy(userId);
            if (myList.size() == 0) {
                responseDTO.setStatus_code(204);
                responseDTO.setMessage("즐겨찾기한 병원리스트가 없습니다");
                responseDTO.setData("null");
            } else {
                List<HospitalRes> result = new ArrayList<>();
                for (HospitalMy hospitalMy : myList) {
                    Optional<Hospital> hospital = hospitalRepository.findById(hospitalMy.getHospital_id());
                    List<HospitalPart> partList = hospitalRepository.findHospitalPart(hospitalMy.getHospital_id()); //진료과목
                    List<String> partResult = new ArrayList<>();
                    if (partList.size() > 0) {
                        for (int j = 0; j < partList.size(); j++) {
                            int partNo = partList.get(j).getHospital_part_name();
                            partResult.add(findPart(partNo)); //진료과목 찾아서 넣기
                            partResult.add(partList.get(j).getHospital_part_doctor() + ""); //의사수
                        }
                    }
                    HospitalRes hospitalRes = HospitalRes.builder()
                            .hospitalId(hospital.get().getHospital_id())
                            .hospitalName(hospital.get().getHospital_name())
                            .hospitalCode(hospital.get().getHospital_code())
                            .hospitalX(hospital.get().getHospital_x())
                            .hospitalY(hospital.get().getHospital_y())
                            .hospitalTel(hospital.get().getHospital_tel())
                            .hospitalTime(hospital.get().getHospitalTime())
                            .hospitalPart(partResult)
                            .build();
                    result.add(hospitalRes);
                }
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("즐겨찾기한 병원리스트");
                responseDTO.setData(result);
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            exception.printStackTrace();
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO findList(String token) throws Exception {
        Long user_id=userRepository.findByUserEmail(tokenService.getEmail(token)).getUserId();
        List<DrugMyRes> result = new ArrayList<>();
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            List<DrugMy> drugMIES = drugMyRepository.findList(user_id);
            if (drugMIES == null) {
                responseDTO.setMessage("출력 실패");
                responseDTO.setStatus_code(400);
            }
            else {
                for (int i = 0; i < drugMIES.size(); i++) {
                    DrugMyRes drugMyRes = DrugMyRes.builder()
                        .drugMyId(drugMIES.get(i).getDrug_my_id())
                        .drugMyDel(drugMIES.get(i).getDrug_my_del())
                        .drugMyMemo(drugMIES.get(i).getDrug_my_memo())
                        .drugMyTitle(drugMIES.get(i).getDrug_my_title())
                        .userId(user_id)
                        .build();
                    result.add(drugMyRes);
                }
                responseDTO.setData(result);
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
        List<DrugMyPillRes> result = new ArrayList<>();
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            List<DrugMyPill> drugMyPills = drugMyPillRepository.findMyPillList(drug_my_id);
            if (drugMyPills == null) {
                responseDTO.setMessage("출력 실패");
                responseDTO.setStatus_code(400);
            }
            else {
                for (int i = 0; i < drugMyPills.size(); i++) {
                    DrugMyPillRes drugMyPillRes = DrugMyPillRes.builder()
                        .drugMyPillId(drugMyPills.get(i).getDrug_my_pill_id())
                        .drugId(drugMyPills.get(i).getDrug())
                        .drugMyId(drug_my_id)
                        .build();
                    result.add(drugMyPillRes);
                }
                responseDTO.setData(result);
                responseDTO.setMessage("나의 약봉지 속 약 출력 성공");
                responseDTO.setStatus_code(200);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseDTO;
    }

    @Override
    public DrugMyRes createDrugMy(DrugMyCreateRes drugMyCreateRes) throws Exception {
        DrugMy drugMy = new DrugMy();

        DrugMyRes result = new DrugMyRes();
        DrugMyPillRes result2 = new DrugMyPillRes();

        try {
            drugMy.setDrug_my_del(false);
            drugMy.setDrug_my_memo(drugMyCreateRes.getDrugMyMemo());
            drugMy.setDrug_my_title(drugMyCreateRes.getDrugMyTitle());

            result = new DrugMyRes(drugMyRepository.save(drugMy));

            for (int i = 0; i < drugMyCreateRes.getDrugId().size(); i++) {
                // id로 약 정보 찾기
                Drug info = drugRepository.selectDrug(drugMyCreateRes.getDrugId().get(i));

                DrugMyPill drugMyPill = new DrugMyPill();

                drugMyPill.setDrug_my(drugMy);
                drugMyPill.setDrug(info);

                result2 = new DrugMyPillRes(drugMyPillRepository.save(drugMyPill));
            }




        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public ResponseDTO deleteDrugMy(Long drug_my_id) throws Exception {

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            int result = drugMyRepository.deleteDrugMyById(drug_my_id);
            System.out.println(result);
            if (result == 1) {
                responseDTO.setData(result);
                responseDTO.setMessage("나의 약봉지 삭제 성공");
                responseDTO.setStatus_code(200);
            } else {
                responseDTO.setMessage("출력 실패");
                responseDTO.setStatus_code(400);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseDTO;
    }

    /**
     * 진료과목
     */
    private String findPart(int partNo) {
        String[] arr = {"일반의", "내과", "신경과", "정신건강의학과", "외과", "정형외과", "신경외과", "심장혈관흉부외과", "성형외과", "마취통증의학과", "산부인과",
                "소아청소년과", "안과", "이비인후과", "피부과", "비뇨의학과", "진단방사선과,영상의학과", "방사선종양학과", "병리과", "진단검사의학과", "결핵과", "재활의학과"
                , "핵의학과", "가정의학과", "응급의학과", "직업환경의학과", "예방의학과", "치과", "한방", "29", "약국", "기타", "32", "33", "34", "35", "36", "37", "38", "39",
                "약국", "보건", "보건기관치과", "43", "보건기관한방", "45", "46", "47", "48", "치과", "구강악안면외과", "치과보철과", "치아교정과", "소아치과", "치주과", "치과보존과", "구강내과",
                "영상치의학과", "구강병리과", "예방치과", "치과소계", "통합치의학과", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71"
                , "72", "73", "74", "75", "76", "77", "78", "79", "한방내과", "한방부인과", "한방소아과", "한방안·이비인후·피부과", "한방신경정신과"
                , "침구과", "한방재활의학과", "사상체질과", "한방응급", "89", "한방소계", "91", "92", "93", "94", "95", "96", "97", "98", "99", "한의원"};
        return arr[partNo];
    }
}
