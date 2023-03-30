package com.roller.doc.db.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name = "hospital_time")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalTime {
    @Id
    @Column(name = "hospital_time_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospital_time_id;

    @JoinColumn(name = "hospital_id")
    @OneToOne(fetch = FetchType.LAZY)
    private Hospital hospital;
//	@Column(name="hospital_id", columnDefinition = "INT")
//	private long hospital_id;

    @Column(name = "hospital_time_mon", columnDefinition = "VARCHAR(100)")
    private String hospital_time_mon;


    @Column(name = "hospital_time_tue", columnDefinition = "VARCHAR(100)")
    private String hospital_time_tue;


    @Column(name = "hospital_time_wed", columnDefinition = "VARCHAR(100)")
    private String hospital_time_wed;


    @Column(name = "hospital_time_thu", columnDefinition = "VARCHAR(100)")
    private String hospital_time_thu;


    @Column(name = "hospital_time_fri", columnDefinition = "VARCHAR(100)")
    private String hospital_time_fri;


    @Column(name = "hospital_time_sat", columnDefinition = "VARCHAR(100)")
    private String hospital_time_sat;

    @Column(name = "hospital_time_sun", columnDefinition = "VARCHAR(100)")
    private String hospital_time_sun;

    @Column(name = "hospital_time_mon_night", columnDefinition = "tinyint(1)")
    private int hospital_time_mon_night;

    @Column(name = "hospital_time_tue_night", columnDefinition = "tinyint(1)")
    private int hospital_time_tue_night;

    @Column(name = "hospital_time_wed_night", columnDefinition = "tinyint(1)")
    private int hospital_time_wed_night;

    @Column(name = "hospital_time_thu_night", columnDefinition = "tinyint(1)")
    private int hospital_time_thu_night;

    @Column(name = "hospital_time_fri_night", columnDefinition = "tinyint(1)")
    private int hospital_time_fri_night;

    @Column(name = "hospital_time_sat_night", columnDefinition = "tinyint(1)")
    private int hospital_time_sat_night;

    @Column(name = "hospital_time_sun_night", columnDefinition = "tinyint(1)")
    private int hospital_time_sun_night;

    @Column(name = "hospital_time_holiday", columnDefinition = "tinyint(1)")
    private int hospital_time_holiday;

    @Column(name = "hospital_time_etc", columnDefinition = "text")
    private String hospital_time_etc;

}
