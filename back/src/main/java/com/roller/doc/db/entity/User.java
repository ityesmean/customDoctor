package com.roller.doc.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name="user")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@Column(name="user_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;

	@Column(name="user_name",columnDefinition = "VARCHAR(20)", nullable = false)
	private String user_name;

	@Column(name="user_email",columnDefinition = "VARCHAR(30)", nullable = false)
	private String user_email;

	@ColumnDefault("false")
	@Column(name="user_deleted",columnDefinition = "BOOLEAN", nullable = false)
	private Boolean user_deleted;

	@Column(name="grant")
	@Enumerated(EnumType.STRING)
	private Role grant;

	@OneToMany(mappedBy = "user")
	List<DrugMy> drugMIES = new ArrayList<DrugMy>();

	public void addDrugMy(DrugMy drugMy) {
		drugMIES.add(drugMy);
		drugMy.setUser(this);
	}

	@OneToMany(mappedBy = "user")
	List<HospitalMy> hospitalMies = new ArrayList<HospitalMy>();

	public void addHospitalMy(HospitalMy hospitalMy) {
		hospitalMies.add(hospitalMy);
		hospitalMy.setUser(this);
	}
}
