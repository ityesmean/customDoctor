package com.roller.doc.api.response.hospital;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
public class HospitalFilterPart {

	private List<String> hospitalPartName; //진료 과목
	private List<Integer> hospitalPartDoctor; //과목의 전문의수
	@Builder
	public HospitalFilterPart(List<String> hospitalPartName, List<Integer> hospitalPartDoctor) {
		this.hospitalPartName = hospitalPartName;
		this.hospitalPartDoctor = hospitalPartDoctor;
	}
}
