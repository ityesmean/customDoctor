DROP TABLE IF EXISTS hospital_4_tmp;
CREATE EXTERNAL TABLE hospital_4_tmp (
	htmp4_secu string,
	htmp4_name string, -- 이름
	htmp4_spot string,
	htmp4_dis string,
	htmp4_len string,
	htmp4_parking int, -- 주차가능대수
	htmp4_price string,
	htmp4_parkingetc string,
	htmp4_sunday string,
	htmp4_holiday string,
	htmp4_er1 string,
	htmp4_er2 string,
	htmp4_er3 string,
	htmp4_er4 string,
	htmp4_er5 string,
	htmp4_er6 string,
	htmp4_lunch1 string,
	htmp4_lunch2 string,
	htmp4_enter1 string,
	htmp4_enter2 string,
	htmp4_start1 string, -- 진료시간
	htmp4_end1 string,
	htmp4_start2 string,
	htmp4_end2 string,
	htmp4_start3 string,
	htmp4_end3 string,
	htmp4_start4 string,
	htmp4_end4 string,
	htmp4_start5 string,
	htmp4_end5 string,
	htmp4_start6 string,
	htmp4_end6 string,
	htmp4_start7 string,
	htmp4_end7 string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/hospital/hospital/4'
tblproperties ("skip.header.line.count"="1"); 


DROP TABLE IF EXISTS hospital_7_tmp;
CREATE EXTERNAL TABLE hospital_7_tmp (
	htmp7_secu string,
	htmp7_name string, -- 이름
	htmp7_code string,
	htmp7_codename string, -- 장비코드명
	htmp7_cnt int	-- 장비 대수
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/hospital/hospital/7'
tblproperties ("skip.header.line.count"="1"); 

DROP TABLE IF EXISTS hospital_10_tmp;
CREATE EXTERNAL TABLE hospital_10_tmp (
	htmp10_secu string,
	htmp10_name string, -- 이름
	htmp10_code string,
	htmp10_special string -- 검색코드명
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/hospital/hospital/10'
tblproperties ("skip.header.line.count"="1"); 


