package com.roller.doc.api.service.hospital;

import com.roller.doc.api.response.ResponseDTO;
import com.roller.doc.api.response.hospital.HospitalDescRes;
import com.roller.doc.api.response.hospital.HospitalRes;
import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalDesc;
import com.roller.doc.db.entity.HospitalPart;
import com.roller.doc.db.repository.HospitalRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class HospitalServiceImpl implements HospitalService {

    private HospitalRepository hospitalRepository;

    @Autowired
    public HospitalServiceImpl(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @Override
    public ResponseDTO searchByHospitalLocation(double x, double y, int d) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<Hospital> hospitalList = hospitalRepository.searchByHospitalLocation(x, y, d);
        if (hospitalList.isEmpty()) {
            responseDTO.setStatus_code(0);
            responseDTO.setMessage("범위 안에 병원이 없습니다");
        } else {
            responseDTO.setStatus_code(1);
            responseDTO.setMessage("범위안에 병원찾기 검색 결과 리스트");
            responseDTO.setData(hospitalList);
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO searchByHospitalName(String word, double x, double y) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<Hospital> hospitalList = hospitalRepository.searchByHospitalName(word,x, y);
//        System.out.println(hospitalList.get(0).getHospital_name());
        if (hospitalList.size() == 0) { //반환값이 없으면 실패
            responseDTO.setStatus_code(200);
            responseDTO.setMessage("검색 결과가 없습니다");
            responseDTO.setData(null);
        } else {
            List<HospitalRes> result = new ArrayList<>();
            //거리 안에 있는 이름 검색결과로 view 리스트 반환
            for (int i = 0; i < hospitalList.size(); i++) {
                int id = hospitalList.get(i).getHospital_id();
                List<HospitalPart> partList = hospitalRepository.findHospitalPart(id); //진료과목
//                System.out.println("------------------------------------------");
                List<String> partResult = new ArrayList<>();
                if (partList.size() == 0) {
                    responseDTO.setStatus_code(0);
                    responseDTO.setMessage("검색 결과가 없습니다");
                    responseDTO.setData(null);
                } else {
                    for (int j = 0; j < partList.size(); j++) {
                        int partNo = partList.get(i).getHospital_part_name();
                        partResult.add(findPart(partNo)); //진료과목 찾아서 넣기
                        partResult.add(partList.get(i).getHospital_part_doctor() + ""); //의사수
                    }
                }
                HospitalRes hospitalRes = HospitalRes.builder()
                        .hospitalId(hospitalList.get(i).getHospital_id())
                        .hospitalName(hospitalList.get(i).getHospital_name())
                        .hospitalCode(hospitalList.get(i).getHospital_code())
                        .hospitalTel(hospitalList.get(i).getHospital_tel())
                        .hospitalStar(hospitalList.get(i).getHospital_star())
                        .hospitalTime(partResult) //운영시간없음
                        .hospitalPart(partResult)
                        .hospitalDistance(0) //거리없음
                        .build();
                result.add(hospitalRes);
            }
            responseDTO.setStatus_code(200);
            responseDTO.setMessage("이름으로 병원찾기 검색 결과 리스트");
            responseDTO.setData(result);
        }
        return responseDTO;

    }

    private String findPart(int partNo) {
        String[] arr = {"내과", "신경과", "정신건강의학과", "외과", "정형외과", "신경외과", "심장혈관흉부외과", "성형외과", "마취통증의학과", "산부인과",
                "소아청소년과", "안과", "이비인후과", "피부과", "비뇨의학과", "영상의학과", "방사선종양학과", "병리과", "진단검사의학과", "결핵과", "재활의학과"
                , "핵의학과", "가정의학과", "응급의학과", "직업환경의학과", "예방의학과", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                "40", "보건", "보건기관치과", "보건기관한방", "치과", "구강악안면외과", "치과보철과", "소아치과", "치주과", "치과보존과", "구강내과",
                "영상치의학과", "구강병리과", "예방치과", "치과소계", "통합치의학과", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71"
                , "72", "73", "74", "75", "76", "77", "78", "79", "한방내과", "한방부인과", "한방소아과", "한방안·이비인후·피부과", "한방신경정신과"
                , "침구과", "한방재활의학과", "사상체질과", "한방응급"};
        return arr[partNo];
    }


    @Override
    public ResponseDTO detailedHospital(int id) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            HospitalDesc hospitalDesc = hospitalRepository.findHospitalDesc(id);
            if (hospitalDesc == null) {
                responseDTO.setStatus_code(0);
                responseDTO.setMessage("상세보기가 없습니다");
            } else {
                HospitalDescRes hospitalDescRes = HospitalDescRes.builder()
                        .hospitalAdd(hospitalDesc.getHospital_desc_add())
                        .hospitalParking(hospitalDesc.getHospital_desc_parking())
                        .hospitalDevice(hospitalDesc.getHospital_desc_device())
                        .hospitalSpecial(hospitalDesc.getHospital_desc_special())
                        .build();
                responseDTO.setStatus_code(200);
                responseDTO.setMessage("병원 상세보기");
                responseDTO.setData(hospitalDescRes);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return responseDTO;
    }
}
