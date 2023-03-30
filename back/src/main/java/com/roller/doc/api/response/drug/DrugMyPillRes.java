package com.roller.doc.api.response.drug;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.DrugMyPill;

import lombok.Getter;

@Getter
public class DrugMyPillRes {
	private Long drug_my_pill_id;
	private Long drug_id;
	private Long drug_my_id;

	public DrugMyPillRes() {

	}

	public DrugMyPillRes(DrugMyPill drugMyPill) {
		Drug drug = drugMyPill.getDrug();
		DrugMy drugMy = drugMyPill.getDrug_my();
		this.drug_id = drug.getDrug_id();
		this.drug_my_id = drugMy.getDrug_my_id();
		this.drug_my_pill_id = drugMyPill.getDrug_my_pill_id();
	}
}
