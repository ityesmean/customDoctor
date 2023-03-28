package com.roller.doc.api.response.drug;

import com.roller.doc.db.entity.DrugMy;
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

	@Builder
	public DrugMyRes(Long drugMyId, Boolean drugMyDel, String drugMyMemo, String drugMyTitle, Long userId) {
		this.drugMyId = drugMyId;
		this.drugMyDel = drugMyDel;
		this.drugMyMemo = drugMyMemo;
		this.drugMyTitle = drugMyTitle;
		this.userId = userId;
	}
}
