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
    private String hospitalTimeMon;


    @Column(name = "hospital_time_tue", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeTue;


    @Column(name = "hospital_time_wed", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeWed;


    @Column(name = "hospital_time_thu", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeThu;


    @Column(name = "hospital_time_fri", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeFri;


    @Column(name = "hospital_time_sat", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeSat;

    @Column(name = "hospital_time_sun", columnDefinition = "VARCHAR(100)")
    private String hospitalTimeSun;

    @Column(name = "hospital_time_mon_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeMonNight;

    @Column(name = "hospital_time_tue_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeTueNight;

    @Column(name = "hospital_time_wed_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeWedNight;

    @Column(name = "hospital_time_thu_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeThuNight;

    @Column(name = "hospital_time_fri_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeFriNight;

    @Column(name = "hospital_time_sat_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeSatNight;

    @Column(name = "hospital_time_sun_night", columnDefinition = "tinyint(1)")
    private int hospitalTimeSunNight;

    @Column(name = "hospital_time_holiday", columnDefinition = "tinyint(1)")
    private int hospitalTimeHoliday;

    @Column(name = "hospital_time_etc", columnDefinition = "text")
    private String hospitalTimeEtc;

}
