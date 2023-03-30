package com.roller.doc.api.response.drug;
import com.roller.doc.db.entity.Drug;
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
public class DrugMyPillRes {
	private Long drugMyPillId;
	private Drug drugId;
	private Long drugMyId;

	@Builder
	public DrugMyPillRes(Long drugMyPillId, Drug drugId, Long drugMyId) {
		this.drugMyPillId = drugMyPillId;
		this.drugId = drugId;
		this.drugMyId = drugMyId;
	}

	public DrugMyPillRes(DrugMy drugMy) {

	}
}
