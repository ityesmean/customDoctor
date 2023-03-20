package com.roller.doc.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="hospital_part")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalPart {
	@Id
	@Column(name="hospital_part_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hospital_part_id;

	@Column(name="hospital_part_name",columnDefinition = "INT")
	private int hospital_part_name;

	@Column(name="hospital_part_doctor",columnDefinition = "INT")
	private int hospital_part_doctor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="hospital_id")
	private Hospital hospital;
}
