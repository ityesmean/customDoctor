package com.roller.doc.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="drug_my")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrugMy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="drug_my_id", nullable = false)
	private Long drug_my_id;

	@Column(name="drug_my_time",columnDefinition = "VARCHAR(20)")
	private String drug_my_time;

	@Column(name="drug_my_memo",columnDefinition = "VARCHAR(300)")
	private String drug_my_memo;

	@ColumnDefault("false")
	@Column(name="drug_my_del",columnDefinition = "BOOLEAN", nullable = false)
	private Boolean drug_my_del;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	@OneToMany(mappedBy = "drug_my")
	List<DrugMyPill> drugMyPills = new ArrayList<DrugMyPill>();

	public void addDrugMyPill(DrugMyPill drugMyPill) {
		drugMyPills.add(drugMyPill);
		drugMyPill.setDrug_my(this);
	}
}
