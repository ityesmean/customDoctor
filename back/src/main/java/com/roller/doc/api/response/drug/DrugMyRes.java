package com.roller.doc.api.response.drug;

import java.util.ArrayList;
import java.util.List;

import com.roller.doc.db.entity.DrugMy;
import com.roller.doc.db.entity.DrugMyPill;
import com.roller.doc.db.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class DrugMyRes {
	private Long drugMyId;
	private Boolean drugMyDel;
	private String drugMyMemo;
	private String drugMyTitle;
	private Long userId;

	public DrugMyRes(DrugMy drugMy) {
		User user = drugMy.getUser();
		List<DrugMyPillRes> list = new ArrayList<>();

		this.userId = drugMy.getUser().getUserId();
		this.drugMyId = drugMy.getDrug_my_id();
		this.drugMyDel = drugMy.getDrug_my_del();
		this.drugMyMemo = drugMy.getDrug_my_memo();
		this.drugMyTitle = drugMy.getDrug_my_title();
	}

	@Builder
	public DrugMyRes(Long drugMyId, Boolean drugMyDel, String drugMyMemo, String drugMyTitle, Long userId) {
		this.drugMyId = drugMyId;
		this.drugMyDel = drugMyDel;
		this.drugMyMemo = drugMyMemo;
		this.drugMyTitle = drugMyTitle;
		this.userId = userId;
	}
}
