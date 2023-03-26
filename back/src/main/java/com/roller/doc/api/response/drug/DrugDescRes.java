package com.roller.doc.api.response.drug;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugDesc;

import lombok.Getter;

@Getter
public class DrugDescRes {
	private String drug_desc_cat;
	private String drug_desc_com;
	private String drug_desc_effect;
	private String drug_desc_safety;
	private String drug_desc_shape;
	private String drug_desc_use;
	private Long drug_id;

	public DrugDescRes() {

	}

	public DrugDescRes(DrugDesc drugDesc) {
		Drug drug = drugDesc.getDrug();
		this.drug_id = drug.getDrug_id();
		this.drug_desc_cat = drugDesc.getDrug_desc_cat();
		this.drug_desc_com = drugDesc.getDrug_desc_com();
		this.drug_desc_effect = drugDesc.getDrug_desc_effect();
		this.drug_desc_safety = drugDesc.getDrug_desc_safety();
		this.drug_desc_shape = drugDesc.getDrug_desc_shape();
		this.drug_desc_use = drugDesc.getDrug_desc_use();
	}
}
