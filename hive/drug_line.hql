INSERT OVERWRITE TABLE drug_detail_tmp
        SELECT
	drug_detail_secu ,
	drug_detail_name ,
	drug_detail_com2 ,
	drug_detail_com ,
	drug_detail_shape ,
	drug_detail_img , 
	drug_detail_markf ,
	drug_detail_markb ,
	drug_detail_type ,
	drug_detail_colorf ,
	drug_detail_colorb ,
		case 
		when(drug_detail_markf not like '%분할선%') then '@'
		else drug_detail_linef
		end as drug_detail_linef,
		case 
		when(drug_detail_markb not like '%분할선%') then '@'
		else drug_detail_lineb
		end as drug_detail_lineb,
	drug_detail_size1 ,
	drug_detail_size2 ,
	drug_detail_size3 ,
	drug_detail_imgdate ,
	drug_detail_part ,
	drug_detail_cat , 
	drug_detail_t ,
	drug_detail_heoga ,
	drug_detail_v ,
	drug_detail_w ,
	drug_detail_x ,
	drug_detail_y ,
	drug_detail_z ,
	drug_detail_aa ,
	drug_detail_ab ,
	drug_detail_ac 

        FROM
	drug_detail_tmp
