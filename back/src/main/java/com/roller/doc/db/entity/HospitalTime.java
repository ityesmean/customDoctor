package com.roller.doc.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="hospital_time")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalTime {
	@Id
	@Column(name="hospital_time_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hospital_time_id;

	@Column(name="hospital_time_mon_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_mon_s;

	@Column(name="hospital_time_mon_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_mon_e;

	@Column(name="hospital_time_tue_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_tue_s;

	@Column(name="hospital_time_tue_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_tue_e;

	@Column(name="hospital_time_wed_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_wed_s;

	@Column(name="hospital_time_wed_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_wed_e;

	@Column(name="hospital_time_thu_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_thu_s;

	@Column(name="hospital_time_thu_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_thu_e;

	@Column(name="hospital_time_fri_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_fri_s;

	@Column(name="hospital_time_fri_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_fri_e;

	@Column(name="hospital_time_sat_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_sat_s;

	@Column(name="hospital_time_sat_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_sat_e;

	@Column(name="hospital_time_sun_s",columnDefinition = "VARCHAR(50)")
	private String hospital_time_sun_s;

	@Column(name="hospital_time_sun_e",columnDefinition = "VARCHAR(50)")
	private String hospital_time_sun_e;

	@OneToOne
	@JoinColumn(name="hospital_id")
	private Hospital hospital;
}
