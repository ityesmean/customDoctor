DROP TABLE IF EXISTS drug_desc;
CREATE EXTERNAL TABLE IF NOT EXISTS drug_desc(
 	drug_id int,
 	drug_desc_cat string,
	drug_desc_shape string,
	drug_desc_com string,
	drug_desc_safety string,
	drug_desc_effect string,
	drug_desc_use string
);

INSERT OVERWRITE TABLE drug_desc
        SELECT
					d.drug_id,
					detail.drug_detail_cat,
					detail.drug_detail_shape,
					detail.drug_detail_com,
					info.drug_info_safety,
					info.drug_info_effect,
					info.drug_info_use
        FROM drug d
	LEFT OUTER JOIN drug_detail_tmp detail on d.drug_secu=detail.drug_detail_secu
	LEFT OUTER JOIN drug_info_tmp info on d.drug_secu=info.drug_info_secu;