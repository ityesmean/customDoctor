use doc;

rename table hospital to hospital2;

create table if not exists hospital(
    hospital_id int,
	hospital_location point,
    hospital_index int,
    hospital_name varchar(50),
    hospital_code varchar(20),
    hospital_tel varchar(50),
    hospital_star double,
    primary key(hospital_id)
)ENGINE=MYISAM CHARSET=utf8;

INSERT INTO hospital (hospital_id, hospital_location, hospital_index, hospital_name, hospital_code, hospital_tel, hospital_star)
SELECT hospital_id, POINT(hospital_x, hospital_y) as hospital_location, hospital_index, hospital_name, hospital_code, hospital_tel, hospital_star
FROM hospital2;

drop table hospital2;

UPDATE hospital SET hospital_location = POINT(0, 0) WHERE hospital_location is NULL;
ALTER TABLE hospital MODIFY COLUMN hospital_location point NOT NULL;
CREATE SPATIAL INDEX idx_hospital ON hospital ( hospital_location );

CREATE INDEX idx_hospital_desc ON hospital_desc ( hospital_id );

CREATE INDEX idx_hospital_part ON hospital_part ( hospital_id, hospital_part_name );

CREATE INDEX idx_drug ON drug ( drug_id );

CREATE INDEX idx_drug_desc ON drug_desc ( drug_id );

ALTER TABLE hospital_part ADD FOREIGN KEY ( hospital_id ) references hospital ( hospital_id );
ALTER TABLE hospital_desc ADD FOREIGN KEY ( hospital_id ) references hospital ( hospital_id );

ALTER TABLE drug_desc ADD FOREIGN KEY ( drug_id ) references drug ( drug_id );
