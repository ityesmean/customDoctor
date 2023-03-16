DROP TABLE IF EXISTS hospital_tmp;
CREATE EXTERNAL TABLE hospital_tmp (
	htmp_secu string,
	htmp_name string, -- 이름
	htmp_code1 string,
	htmp_code string, -- 종별코드
	htmp_sido string,
	htmp_sidoname string,
	htmp_gun int, -- 시군구코드
	htmp_gunname string,
	htmp_dong string,
	htmp_post string,
	htmp_add string,
	htmp_tel string, -- 전화번호
	htmp_page string,
	htmp_open string,
	htmp_doc1 string,
	htmp_doc2 string,
	htmp_doc3 string,
	htmp_doc4 string,
	htmp_doc5 string,
	htmp_doc6 string,
	htmp_doc7 string,
	htmp_doc8 string,
	htmp_doc9 string,
	htmp_doc10 string,
	htmp_doc11 string,
	htmp_doc12 string,
	htmp_doc13 string,
	htmp_x double,
	htmp_y double
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'STORED AS TEXTFILE -- 저장 포맷
LOCATION 'hdfs://127.0.0.1:9000/user/hospital/hospital' -- 저장위치
tblproperties ("skip.header.line.count"="1");  -- 첫번째 row에 해당하는 헤더를 무시하고 정보를 읽는다.
