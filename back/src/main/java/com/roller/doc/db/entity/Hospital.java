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

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.geo.Point;

@Entity
@Builder
@Table(name = "hospital")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Hospital {

    @Id
    @Column(name = "hospital_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hospital_id;

    @Column(name = "hospital_name", columnDefinition = "VARCHAR(50)")
    private String hospital_name;

    @Column(name = "hospital_code", columnDefinition = "VARCHAR(20)")
    private String hospital_code;

    @Column(name = "hospital_x", columnDefinition = "DOUBLE")
    private double hospital_x;

    @Column(name = "hospital_y", columnDefinition = "DOUBLE")
    private double hospital_y;

    @Column(name = "hospital_tel", columnDefinition = "VARCHAR(50)")
    private String hospital_tel;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital")
    List<HospitalPart> hospitalParts = new ArrayList<>();

    public void addHospitalParts(HospitalPart hospitalPart) {
        hospitalParts.add(hospitalPart);
    }

    @JsonIgnore
    @OneToOne(mappedBy = "hospital")
    private HospitalTime hospitalTime;
}