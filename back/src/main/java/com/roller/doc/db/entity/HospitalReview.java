package com.roller.doc.db.entity;

import java.text.DateFormat;
import java.util.Date;

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
@Table(name="hospital_review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalReview {
	@Id
	@Column(name="hospital_review_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hospital_review_id;

	@Column(name="hospital_review_con",columnDefinition = "VARCHAR(300)")
	private String hospital_review_con;

	@Column(name="hospital_review_time",columnDefinition = "VARCHAR(20)")
	private String hospital_review_time;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="hospital_id")
	private Hospital hospital;
}
