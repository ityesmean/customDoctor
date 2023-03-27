package com.roller.doc.api.response.drug;

import com.roller.doc.db.entity.Drug;

import lombok.Getter;

@Getter
public class DrugRes {
	private Long drug_id;
	private String drug_colorb;
	private String drug_colorf;
	private String drug_img;
	private String drug_ingre;
	private String drug_line;
	private String drug_markb;
	private String drug_markf;
	private String drug_name;
	private String drug_type;

	public DrugRes() {
	}

	public DrugRes(Drug drug) {
		this.drug_id = drug.getDrug_id();
		this.drug_colorb = drug.getDrug_colorb();
		this.drug_colorf = drug.getDrug_colorf();
		this.drug_img = drug.getDrug_img();
		this.drug_ingre = drug.getDrug_ingre();
		this.drug_line = drug.getDrug_line();
		this.drug_markb = drug.getDrug_markb();
		this.drug_markf = drug.getDrug_markf();
		this.drug_name = drug.getDrug_name();
		this.drug_type = drug.getDrug_type();
	}


}
