package com.roller.doc.api.response.drug;
import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class DrugMyCreateRes {
	private Long drugMyPillId;
	private List<Long> drugId;
	private Long drugMyId;
	private Boolean drugMyDel;
	private String drugMyMemo;
	private String drugMyTitle;

	@Builder
	public DrugMyCreateRes(Long drugMyPillId, List<Long> drugId, Long drugMyId, Boolean drugMyDel, String drugMyMemo,
		String drugMyTitle) {
		this.drugMyPillId = drugMyPillId;
		this.drugId = drugId;
		this.drugMyId = drugMyId;
		this.drugMyDel = drugMyDel;
		this.drugMyMemo = drugMyMemo;
		this.drugMyTitle = drugMyTitle;
	}
}
