package com.roller.doc.api.response.drug;
import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugAvoid;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class DrugAvoidRes {
	private Long drugAvoidId;
	private Long drugId;
	private int drugAvoidB;
	private String drugAvoidNameB;
	private String drugAvoidDesc;

	@Builder
	public DrugAvoidRes(Long drugAvoidId, Long drugId, int drugAvoidB, String drugAvoidNameB, String drugAvoidDesc) {
		this.drugAvoidId = drugAvoidId;
		this.drugId = drugId;
		this.drugAvoidB = drugAvoidB;
		this.drugAvoidNameB = drugAvoidNameB;
		this.drugAvoidDesc = drugAvoidDesc;
	}
}
