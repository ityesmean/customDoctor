package com.roller.doc.api.response.hospital;

import lombok.Data;

@Data
public class HospitalFilterTime {
	private int hospitalId;
	private String hospitalMonS;
	private String hospitalMonE;


}
