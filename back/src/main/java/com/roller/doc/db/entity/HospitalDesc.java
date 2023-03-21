package com.roller.doc.db.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="hospital_desc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDesc implements Serializable {

	@Id
	@OneToOne
	@JoinColumn(name = "hospital_id")
	private Hospital hospital;

	@Column(name="hospital_desc_add",columnDefinition = "VARCHAR(300)")
	private String hospital_desc_add;

	@Column(name="hospital_desc_parking",columnDefinition = "INT")
	private String hospital_desc_parking;

	@Column(name="hospital_desc_device",columnDefinition = "VARCHAR(300)")
	private String hospital_desc_device;

	@Column(name="hospital_desc_special",columnDefinition = "VARCHAR(100)")
	private String hospital_desc_special;

}
