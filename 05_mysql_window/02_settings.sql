use doc;

CREATE INDEX idx_hospital ON hospital ( hospital_y, hospital_x );
CREATE INDEX idx_hospital_desc ON hospital_desc ( hospital_id );
CREATE INDEX idx_hospital_part ON hospital_part ( hospital_id, hospital_part_name );
CREATE INDEX idx_hospital_time ON hospital_time ( hospital_id );
CREATE INDEX idx_drug ON drug ( drug_id );
CREATE INDEX idx_drug_desc ON drug_desc ( drug_id );
CREATE INDEX idx_drug_avoid ON drug_avoid ( drug_id );

UPDATE drug SET drug_ingre = 'null' WHERE drug_ingre IS NULL;
UPDATE drug_desc SET drug_desc_safety = 'null' WHERE drug_desc_safety IS NULL;
UPDATE drug_desc SET drug_desc_effect = 'null' WHERE drug_desc_effect IS NULL;
UPDATE drug_desc SET drug_desc_use = 'null' WHERE drug_desc_use IS NULL;

ALTER TABLE hospital ADD FULLTEXT INDEX idx_hospital_name(hospital_name) WITH PARSER NGRAM;
