package com.roller.doc.api.response.drug;
import java.util.List;

import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
public class DrugMyRes {
	private Long drug_my_id;
	private Boolean drug_my_del;
	private String drug_my_memo;
	private String drug_my_title;
	private Long user_id;

	public DrugMyRes() {

	}

	public DrugMyRes(DrugMy drugMy) {
		User user = drugMy.getUser();
		this.user_id = user.getUser_id();
		this.drug_my_id = drugMy.getDrug_my_id();
		this.drug_my_del = drugMy.getDrug_my_del();
		this.drug_my_memo = drugMy.getDrug_my_memo();
		this.drug_my_title = drugMy.getDrug_my_title();
	}
}
