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
@Table(name="drug_avoid")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrugAvoid {
	@Id
	@Column(name="drug_avoid_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long drug_avoid_id;

	@Column(name="drug_avoid_b",columnDefinition = "INT")
	private int drug_avoid_b;

	@Column(name="drug_avoid_desc",columnDefinition = "VARCHAR(300)")
	private String drug_avoid_desc;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="drug_id")
	private Drug drug;

}
