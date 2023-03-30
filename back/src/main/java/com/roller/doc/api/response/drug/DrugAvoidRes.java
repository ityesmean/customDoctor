package com.roller.doc.api.response.drug;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugAvoid;

import lombok.Getter;

@Getter
public class DrugAvoidRes {
	private Long drug_avoid_id;
	private int drug_avoid_b;
	private String drug_avoid_desc;
	private Long drug_id;

	public DrugAvoidRes() {
	}

	public DrugAvoidRes(DrugAvoid drugAvoid) {
		Drug drug = drugAvoid.getDrug();
		this.drug_id = drug.getDrug_id();
		this.drug_avoid_id = drugAvoid.getDrug_avoid_id();
		this.drug_avoid_b = drugAvoid.getDrug_avoid_b();
		this.drug_avoid_desc = drugAvoid.getDrug_avoid_desc();
	}
}
