package com.roller.doc.api.service.hospital;

import com.roller.doc.api.request.HospitalFilterReq;
import com.roller.doc.api.request.HospitalSearchReq;
import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.hospital.HospitalDescRes;
import com.roller.doc.api.response.hospital.HospitalRes;
import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalDesc;
import com.roller.doc.db.entity.HospitalPart;
import com.roller.doc.db.repository.HospitalCustomRepo;
import com.roller.doc.db.repository.HospitalRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Log4j2
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;
    private final HospitalCustomRepo hospitalCustomRepo;

    @Autowired
    public HospitalServiceImpl(HospitalRepository hospitalRepository, HospitalCustomRepo hospitalCustomRepo) {
        this.hospitalRepository = hospitalRepository;
        this.hospitalCustomRepo = hospitalCustomRepo;
    }

    /**
     * 이름으로 병원찾기
     */
    @Override
    public ResponseDTO searchByHospitalName(String word, HospitalSearchReq Req) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<Hospital> hospitalList = hospitalCustomRepo.searchByHospitalName(word, Req.getE(), Req.getW(), Req.getS(), Req.getN());
        if (hospitalList.size() == 0) { //반환값이 없으면 실패
            responseDTO.setStatus_code(204);
            responseDTO.setMessage("검색 결과가 없습니다");
            responseDTO.setData("null");
        } else {
            List<HospitalRes> result = new ArrayList<>();
            for (int i = 0; i < hospitalList.size(); i++) {
                long id = hospitalList.get(i).getHospital_id();
                //진료과목 리스트 만들기
                List<HospitalPart> partList = hospitalRepository.findHospitalPart(id); //진료과목
                List<String> partResult = new ArrayList<>();
                if (partList.size() > 0) {
                    for (int j = 0; j < partList.size(); j++) {
                        int partNo = partList.get(j).getHospital_part_name();
                        partResult.add(findPart(partNo)); //진료과목 찾아서 넣기
                        partResult.add(partList.get(j).getHospital_part_doctor() + ""); //의사수
                    }
                }
                //영업중 여부 판단하기
                boolean hospitalOpen = isOpen(hospitalList.get(i), Req.getHour(), Req.getMin(), Req.getDay());
                //빌드
                HospitalRes hospitalRes = HospitalRes.builder()
                        .hospitalId(hospitalList.get(i).getHospital_id())
                        .hospitalName(hospitalList.get(i).getHospital_name())
                        .hospitalOpen(hospitalOpen)
                        .hospitalCode(hospitalList.get(i).getHospital_code())
                        .hospitalX(hospitalList.get(i).getHospital_x())
                        .hospitalY(hospitalList.get(i).getHospital_y())
                        .hospitalTel(hospitalList.get(i).getHospital_tel())
                        .hospitalTime(hospitalList.get(i).getHospitalTime())
                        .hospitalPart(partResult)
                        .build();
                result.add(hospitalRes);
            }
            responseDTO.setStatus_code(200);
            responseDTO.setMessage("이름으로 병원찾기 검색 결과 리스트");
            responseDTO.setData(result);
        }
        return responseDTO;
    }


    /**
     * 필터로 병원찾기
     */
    @Override
    public ResponseDTO filteringHospital(HospitalFilterReq Req) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<HospitalRes> result = new ArrayList<>();
        try {
            List<Hospital> hospitalList = hospitalCustomRepo.useFilterHospital(Req.getE(),Req.getW(), Req.getS(), Req.getN(), Req.getPart(), Req.getOpen());
            if (hospitalList.size() == 0) {
                responseDTO.setStatus_code(400);
                responseDTO.setMessage("필터로 병원찾기: 일치하는 병원이 없습니다");
                responseDTO.setData("null");
            } else {
                // id로 병원 찾기
                for (Hospital hospital : hospitalList) {
                    List<HospitalPart> partList = hospitalRepository.findHospitalPart(hospital.getHospital_id()); //진료과목
                    List<String> partResult = new ArrayList<>();
                    if (partList.size() > 0) {
                        for (int j = 0; j < partList.size(); j++) {
                            int partNo = partList.get(j).getHospital_part_name();
                            partResult.add(findPart(partNo)); //진료과목 찾아서 넣기
                            partResult.add(partList.get(j).getHospital_part_doctor() + ""); //의사수
                        }
                    }
                    //영업중 여부 판단하기
                    boolean hospitalOpen = isOpen(hospital, Req.getHour(), Req.getMin(), Req.getDay());
                    HospitalRes hospitalRes = HospitalRes.builder()
                            .hospitalId(hospital.getHospital_id())
                            .hospitalName(hospital.getHospital_name())
                            .hospitalOpen(hospitalOpen)
                            .hospitalCode(hospital.getHospital_code())
                            .hospitalX(hospital.getHospital_x())
                            .hospitalY(hospital.getHospital_y())
                            .hospitalTel(hospital.getHospital_tel())
                            .hospitalTime(hospital.getHospitalTime())
                            .hospitalPart(partResult)
                            .build();
                    result.add(hospitalRes);
                }
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("필터로 병원찾기 목록");
                responseDTO.setData(result);
            }
        } catch (
                Exception exception) {
            log.error(exception.getMessage());
            exception.printStackTrace();
        }
        return responseDTO;
    }

    /**
     * 병원 상세보기
     */
    @Override
    public ResponseDTO detailedHospital(long id) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Optional<HospitalDesc> hospitalDesc = hospitalRepository.findHospitalDesc(id);
            if (hospitalDesc == null) {
                responseDTO.setStatus_code(400);
                responseDTO.setMessage("상세보기가 없습니다");
                responseDTO.setData("null");
            } else {
                HospitalDescRes hospitalDescRes = HospitalDescRes.builder()
                        .hospitalId(id)
                        .hospitalAdd(hospitalDesc.get().getHospital_desc_add())
                        .hospitalParking(hospitalDesc.get().getHospital_desc_parking())
                        .hospitalDevice(hospitalDesc.get().getHospital_desc_device())
                        .hospitalSpecial(hospitalDesc.get().getHospital_desc_special())
                        .build();
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("병원 상세보기");
                responseDTO.setData(hospitalDescRes);
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            exception.printStackTrace();
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

    /**
     * 영업중인지 여부 판단하기
     */
    public static boolean isOpen(Hospital h, int hour, int min, int day) {
        int now = (hour * 100) + min;
        String[] str;

        //일:0 월:1 화:2 수:3 목:4 금:5 토:6
        if(h.getHospitalTime()==null){
            return false;
        }
        switch (day) {
            case 0:
                if (h.getHospitalTime().getHospitalTimeSun().equals("null")) { //null이면 영업안함
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeSun().split("~");
                    return check(str, now);
                }
            case 1:
                if (h.getHospitalTime().getHospitalTimeMon().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeMon().split("~");
                    return check(str, now);
                }
            case 2:
                if (h.getHospitalTime().getHospitalTimeTue().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeTue().split("~");
                    return check(str, now);
                }
            case 3:
                if (h.getHospitalTime().getHospitalTimeWed().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeTue().split("~");
                    return check(str, now);
                }
            case 4:
                if (h.getHospitalTime().getHospitalTimeThu().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeTue().split("~");
                    return check(str, now);
                }
            case 5:
                if (h.getHospitalTime().getHospitalTimeFri().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeTue().split("~");
                    return check(str, now);
                }
            case 6:
                if (h.getHospitalTime().getHospitalTimeSat().equals("null")) {
                    return false;
                } else {
                    str = h.getHospitalTime().getHospitalTimeTue().split("~");
                    return check(str, now);
                }
            default:
                return false;
        }
    }

    /**
     * 지금 이시간에 영업중인지 계산
     */
    public static boolean check(String[] str, int now) {
        int start = (str[0].charAt(0) - '0') * 1000 + (str[0].charAt(1) - '0') * 100 + (str[0].charAt(3) - '0') * 10 + str[0].charAt(4) - '0';
        int end = (str[1].charAt(0) - '0') * 1000 + (str[1].charAt(1) - '0') * 100 + (str[1].charAt(3) - '0') * 10 + str[1].charAt(4) - '0';
        if (start <= now && now <= end) {
            return true;
        } else {
            return false;
        }
    }
}
