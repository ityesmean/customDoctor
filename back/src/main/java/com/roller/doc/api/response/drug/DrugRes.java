package com.roller.doc.api.response.drug;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class DrugRes {
	private Long drugId;
	private String drugName;
	private String drugImg;
	private String drugMarkf;
	private String drugMarkb;
	private String drugType;
	private String drugColorf;
	private String drugColorb;
	private String drugLine;
	private String drugIngre;

	@Builder
	public DrugRes(Long drugId, String drugColorb, String drugColorf, String drugImg, String drugIngre, String drugLine,
		String drugMarkb, String drugMarkf, String drugName, String drugType) {
		this.drugId = drugId;
		this.drugName = drugName;
		this.drugImg = drugImg;
		this.drugMarkf = drugMarkf;
		this.drugMarkb = drugMarkb;
		this.drugType = drugType;
		this.drugColorf = drugColorf;
		this.drugColorb = drugColorb;
		this.drugLine = drugLine;
		this.drugIngre = drugIngre;
	}
}
