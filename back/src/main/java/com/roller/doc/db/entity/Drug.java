package com.roller.doc.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="drug")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Drug {
	@Id
	@Column(name="drug_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long drug_id;

	@Column(name="drug_name",columnDefinition = "VARCHAR(100)")
	private String drug_name;

	@Column(name="drug_img",columnDefinition = "VARCHAR(100)")
	private String drug_img;

	@Column(name="drug_markf",columnDefinition = "VARCHAR(100)")
	private String drug_markf;

	@Column(name="drug_markb",columnDefinition = "VARCHAR(100)")
	private String drug_markb;

	@Column(name="drug_type",columnDefinition = "VARCHAR(20)")
	private String drug_type;

	@Column(name="drug_colorf",columnDefinition = "VARCHAR(20)")
	private String drug_colorf;

	@Column(name="drug_colorb",columnDefinition = "VARCHAR(20)")
	private String drug_colorb;

	@Column(name="drug_line",columnDefinition = "VARCHAR(10)")
	private String drug_line;

	@Column(name="drug_ingre",columnDefinition = "VARCHAR(50)")
	private String drug_ingre;

	@JsonIgnore
	@OneToMany(mappedBy = "drug")
	List<DrugMyPill> drugMyPills = new ArrayList<DrugMyPill>();

	public void addDrugMyPill(DrugMyPill drugMyPill) {
		drugMyPills.add(drugMyPill);
		drugMyPill.setDrug(this);
	}

	@JsonIgnore
	@OneToMany(mappedBy = "drug")
	List<DrugAvoid> drugAvoids = new ArrayList<DrugAvoid>();

	public void addDrugAvoid(DrugAvoid drugAvoid) {
		drugAvoids.add(drugAvoid);
		drugAvoid.setDrug(this);
	}

	@JsonIgnore
	@OneToOne(mappedBy = "drug")
	private DrugDesc drugDesc;
}
