DROP TABLE IF EXISTS drug_detail_tmp;
CREATE EXTERNAL TABLE drug_detail_tmp (
	drug_detail_secu string,
	drug_detail_name string, 
	drug_detail_com2 int,
	drug_detail_com string,
	drug_detail_shape string,
	drug_detail_img string, 
	drug_detail_markf string,
	drug_detail_markb string,
	drug_detail_type string,
	drug_detail_colorf string,
	drug_detail_colorb string,
	drug_detail_linef string,
	drug_detail_lineb string,
	drug_detail_size1 string,
	drug_detail_size2 string,
	drug_detail_size3 string,
	drug_detail_imgdate string,
	drug_detail_part string,
	drug_detail_cat string, -- 분류명
	drug_detail_t string,
	drug_detail_heoga int,
	drug_detail_v string,
	drug_detail_w string,
	drug_detail_x string,
	drug_detail_y string,
	drug_detail_z string,
	drug_detail_aa string,
	drug_detail_ab string,
	drug_detail_ac string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/drug/detail'
tblproperties ("skip.header.line.count"="1"); 



DROP TABLE IF EXISTS drug_info_tmp;
CREATE EXTERNAL TABLE drug_info_tmp (
	drug_info_secu string, 
	drug_info_name string,
	drug_info_com string,
	drug_info_ingre string, 
	drug_info_effect string,
	drug_info_use string,
	drug_info_know string,
	drug_info_safety string,
	drug_info_i string,
	drug_info_j string,
	drug_info_k string,
	drug_info_L string,
	drug_info_m string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/drug/info'
tblproperties ("skip.header.line.count"="1"); 



DROP TABLE IF EXISTS drug_codes_tmp;
CREATE EXTERNAL TABLE drug_codes_tmp (
	drug_codes_name string,
	drug_codes_com string,
	drug_codes_gram string,
	drug_codes_d int,
	drug_codes_e string,
	drug_codes_f string,
	drug_codes_secu int,
	drug_codes_heoga int,
	drug_codes_i string,
	drug_codes_j string,
	drug_codes_k string,
	drug_codes_insure int,
	drug_codes_ingrecode int,
	drug_codes_etc string,
	drug_codes_o string, 
	drug_codes_p string,
	drug_codes_q string,
	drug_codes_s string,
	drug_codes_ATC string,
	drug_codes_u string,
	drug_codes_v string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/drug/codes'
tblproperties ("skip.header.line.count"="1"); 



DROP TABLE IF EXISTS drug_avoid_tmp;
CREATE EXTERNAL TABLE drug_avoid_tmp (
	drug_avoid_a string,
	drug_avoid_ingreA string,
	drug_avoid_ingrecodeA string,
	drug_avoid_d int,
	drug_avoid_nameA string,
	drug_avoid_comA string,
	drug_avoid_g string,
	drug_avoid_ingreB string,
	drug_avoid_ingrecodeB string,
	drug_avoid_j string,
	drug_avoid_m string,
	drug_avoid_n string,
	drug_avoid_o string,
	drug_avoid_p string,
	drug_avoid_q string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION 'hdfs://127.0.0.1:9000/user/drug/avoid'
tblproperties ("skip.header.line.count"="1"); 
