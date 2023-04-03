package com.roller.doc.api.response.drug;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class DrugDescRes {
	private Long drugId;
	private String drugDescCat;
	private String drugDescShape;
	private String drugDescCom;
	private String drugDescSafety;
	private String drugDescEffect;
	private String drugDescUse;

	@Builder
	public DrugDescRes(Long drugId, String drugDescCat, String drugDescShape, String drugDescCom, String drugDescSafety,
		String drugDescEffect, String drugDescUse) {
		this.drugId = drugId;
		this.drugDescCat = drugDescCat;
		this.drugDescShape = drugDescShape;
		this.drugDescCom = drugDescCom;
		this.drugDescSafety = drugDescSafety;
		this.drugDescEffect = drugDescEffect;
		this.drugDescUse = drugDescUse;
	}
}
