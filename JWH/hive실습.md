## Hive 에서 auto increment 만들기

```sql
cd /home/hadoop/apache-hive-3.1.2-bin/lib/
ll hive-contrib*

hive
# 라이브러리 추가
add jar hdfs:///user/hive/lib/hive-contrib-3.1.2.jar;

# auto increment 함수 생성
create function row_sequence as 'org.apache.hadoop.hive.contrib.udf.UDFRowSequence' using jar 'hdfs:///user/hive/lib/hive-contrib-3.1.2.jar';

#함수확인
SHOW FUNCTIONS;
describe function row_sequence;
# row_sequence() - Returns a generated row sequence number starting from 1 성공!
```

## hospital table

!! 주소에 , 가 들어있어서 . 로 바꿔줌!!

```bash
hdfs dfs -mkdir /user/hospital/hospital
hdfs dfs -put /home/hadoop/Documents/hospital/hospital.csv /user/hospital/hospital

hdfs dfs -ls /user/hospital/hospital
Found 1 items
-rw-r--r--   1 hadoop supergroup   23050672 2023-03-15 10:10 /user/hospital/hospital/hospital.csv

# hospital_tmp.hql
DROP TABLE IF EXISTS hospital_tmp;
CREATE EXTERNAL TABLE hospital_tmp (
	htmp_secu string,
	htmp_name string, -- 이름
	htmp_code1 int,
	htmp_code string, -- 종별코드
	htmp_sido int,
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
	htmp_doc14 string,
	htmp_x double,
	htmp_y double
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE -- 저장 포맷
LOCATION 'hdfs://127.0.0.1:9000/user/hospital/hospital' -- 저장위치
tblproperties ("skip.header.line.count"="1");  -- 첫번째 row에 해당하는 헤더를 무시하고 정보를 읽는다.

hive
select * from hospital_tmp; -> 확인 O
# Time taken: 1.933 seconds, Fetched: 76032 row(s)

#hospital_hql
DROP TABLE IF EXISTS hospital;
CREATE EXTERNAL TABLE IF NOT EXISTS hospital(
		hospital_id int,
    hospital_index int,
    hospital_name string,
    hospital_code string,
    hospital_x double,
    hospital_y double,
    hospital_tel string,
    hospital_star double
);

INSERT OVERWRITE TABLE hospital
	SELECT
		row_sequence(), 
		htmp_gun,
		htmp_name, 
		htmp_code,
		htmp_x,
		htmp_y,
		htmp_tel,
		0
	FROM hospital_tmp;

```