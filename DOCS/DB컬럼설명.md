## user

### user_id

고유 사용자id

### user_name

이름

### user_email

이메일

### user_deleted

삭제여부

### user_role

관리자여부(등급)

---

## hospital

### hospital_id

자체적으로 생성한 고유 병원id

### hospital_y

저장된 병원의 위도

### hospital_x

저장된 병원의 경도

### hospital_name

요양기관명

### hospital_code

종별코드

### hospital_tel

전화번호

---

## hospital_desc

### hospital_id

고유 병원 id

### hospital_desc_add

병원 주소

### hospital_desc_parking

주차가능 대수

### hospital_desc_device

의료장비정보

### hospital_desc_special

특수진료정보

---

## hospital_time

### hospital_time_id

병원운영시간의 고유 id

### hospital_id

고유 병원 id

### hospital_time_mon ~ hospital_time_sun

월요일 ~ 일요일 진료 시간

### hospital_time_mon_night ~ hospital_time_sun_night

월요일 ~ 일요일 야간 진료 여부

### hospital_time_holiday

공휴일 진료 여부

### hospital_time_etc

병원 진료 시간 기타 정보

---

## hospital_part

### hospital_part_id

병원진료과목 id

### hospital_id

병원 id

### hospital_part_name

진료과목

### hospital_part_doctor

해당 진료과목의 전문의

---

## hospial_my

### hospital_my_id

병원 즐겨찾기 고유id

### user_id

사용자 id

### hospital_id

고유 병원 id

### hospital_my_del

삭제여부

---

## drug

### drug_id

약의 고유 id

### drug_name

제품명

### drug_img

약의 이미지 주소

### drug_markf, drug_markb

약에 쓰여진 식별 문자

### drug_type

약의 모양(정방형, 타원형, 원형, 세모)

### drug_colorf, drug_colorb

약의 색

### drug_line

분할선 여부와 모양

### drug_ingre

약의 성분

---

## drug_desc

### drug_id

약의 고유 id

### drug_desc_cat

약의 분류 (기타의소화기관용약, 항악성종양제)

### drug_desc_shape

약의 외형 (녹색의원형필름코팅정, 엷은적색의원형필름코팅정)

### drug_desc_com

회사명

### drug_desc_safety

안전사용 (3개월미만의영아는이약을복용하지마십시오.이약을복용하기전에3개월이상및1세미만의영아는의사또는약사와상의하십시오.)

### durg_desc_effect

효능 (이약은소화불량|식욕감퇴(식욕부진)|과식|체함|소화촉진|소화불량으로인한위부팽만감에사용합니다.)

### drug_desc_use

사용법 (성인및12세이상의소아는1회2정(1g)을1일3회식후30분~1시간에씹어서복용합니다.필요시취침전에1회더복용할수있습니다.)

---

## drug_avoid

### drug_avoid_id

병용금기 고유 id

### drug_id

약의 id, 피해야하는 약의 주체

### drug_avoid_b

약의 id, 피해야하는 약

### drug_avoid_name_b

피해야하는 약의 이름

### drug_avoid_desc

같이 복용 시 부작용 설명

---

## drug_my

### drug_my_id

나의 약봉지 고유 id

### user_id

유저 id

### drug_my_title

나의 약봉지에 적을 제목

### drug_my_memo

나의 약봉지에 적을 메모

### drug_my_del

나의 약봉지 삭제 여부

---

## drug_mypill

### drug_mypill_id

약봉지속 약의 고유 id

### drug_my_id

약봉지의 id

### drug_id

약의 id
