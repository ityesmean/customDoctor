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
@Table(name="drug_my_pill")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrugMyPill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="drug_my_pill_id", nullable = false)
	private Long drug_my_pill_id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="drug_my_id")
	private DrugMy drug_my;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="drug_id")
	private Drug drug;
}
