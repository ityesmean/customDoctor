package com.roller.doc.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="hospital")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Hospital {

	@Id
	@Column(name="hospital_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hospital_id;

	@Column(name="hospital_index",columnDefinition = "INT")
	private int hospital_index;

	@Column(name="hospital_name",columnDefinition = "VARCHAR(50)")
	private String hospital_name;

	@Column(name="hospital_code",columnDefinition = "VARCHAR(20)")
	private String hospital_code;

	@Column(name="hospital_x",columnDefinition = "DOUBLE")
	private Double hospital_x;

	@Column(name="hospital_y",columnDefinition = "DOUBLE")
	private Double hospital_y;

	@Column(name="hospital_tel",columnDefinition = "VARCHAR(50)")
	private String hospital_tel;

	@Column(name="hospital_star",columnDefinition = "DOUBLE")
	private Double hospital_star;

	@OneToMany(mappedBy = "hospital")
	List<HospitalMy> hospitalMIES = new ArrayList<HospitalMy>();

	public void addHospitalMy(HospitalMy hospitalMy) {
		hospitalMIES.add(hospitalMy);
		hospitalMy.setHospital(this);
	}

	@OneToMany(mappedBy = "hospital")
	List<HospitalPart> hospitalParts = new ArrayList<HospitalPart>();

	public void addHospitalPart(HospitalPart hospitalPart) {
		hospitalParts.add(hospitalPart);
		hospitalPart.setHospital(this);
	}

	@OneToMany(mappedBy = "hospital")
	List<HospitalReview> hospitalReviews = new ArrayList<HospitalReview>();

	public void addHospitalReview(HospitalReview hospitalReview) {
		hospitalReviews.add(hospitalReview);
		hospitalReview.setHospital(this);
	}

	@OneToOne(mappedBy = "hospital")
	private HospitalTime hospitalTime;

	@OneToOne(mappedBy = "hospital")
	private HospitalDesc hospitalDesc;
}
