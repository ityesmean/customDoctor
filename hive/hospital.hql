drop table hospital;

CREATE EXTERNAL TABLE IF NOT EXISTS hospital(
    hospital_id int,
    hospital_index int,
    hospital_name string,
    hospital_code string,
    hospital_x double,
    hospital_y double,
    hospital_tel string,
    hospital_star double,
    hospital_secu string
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
		0,
		htmp_secu
	FROM hospital_tmp;
