package com.roller.doc.db.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="drug_desc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrugDesc implements Serializable {

	@Id
	private Long drug_id;

	@MapsId
	@OneToOne
	@JoinColumn(name = "drug_id")
	private Drug drug;

	@Column(name="drug_desc_cat",columnDefinition = "VARCHAR(100)")
	private String drug_desc_cat;

	@Column(name="drug_desc_shape",columnDefinition = "VARCHAR(300)")
	private String drug_desc_shape;

	@Column(name="drug_desc_com",columnDefinition = "VARCHAR(20)")
	private String drug_desc_com;

	@Column(name="drug_desc_safety",columnDefinition = "TEXT")
	private String drug_desc_safety;

	@Column(name="drug_desc_effect",columnDefinition = "TEXT")
	private String drug_desc_effect;

	@Column(name="drug_desc_use",columnDefinition = "TEXT")
	private String drug_desc_use;
}
