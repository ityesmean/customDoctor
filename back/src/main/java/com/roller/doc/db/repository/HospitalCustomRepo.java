package com.roller.doc.db.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.roller.doc.config.QuerydslConfig;
import com.roller.doc.db.entity.Hospital;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.roller.doc.db.entity.QHospital.*;
import static com.roller.doc.db.entity.QHospitalPart.*;
import static com.roller.doc.db.entity.QHospitalTime.*;


@Repository
@RequiredArgsConstructor
public class HospitalCustomRepo {
    private final QuerydslConfig querydslConfig;

    /**
     * 이름으로 병원검색
     */
    public List<Hospital> searchByHospitalName(String word, double e, double w, double s, double n) {
        JPAQueryFactory query = querydslConfig.jpaQueryFactory();
        return query.selectFrom(hospital)
                .where(hospital.hospital_name.contains(word), locationBetween(e, w, s, n))
                .fetch();
    }

    /**
     * 거리5km+진료과목+운영시간 필터
     */
    public List<Hospital> useFilterHospital(double e, double w, double s, double n, int p1, int p2, int p3, int p4, int p5,
                                            int sat, int sun, int holiday, int night) {
        JPAQueryFactory query = querydslConfig.jpaQueryFactory();
//        QHospital qHospital=new QHospital("h");
        return query.select(hospital)
                .from(hospital)
                .innerJoin(hospitalPart.hospital, hospital).fetchJoin()
                .innerJoin(hospitalTime.hospital, hospital).fetchJoin()
                .where(
                        locationBetween(e, w, s, n)
                                .and((partEq(hospitalPart.hospital.hospital_id,p1)).or(partEq(hospitalPart.hospital.hospital_id,p2)).or(partEq(hospitalPart.hospital.hospital_id,p3)).or(partEq(hospitalPart.hospital.hospital_id,p4)).or(partEq(hospitalPart.hospital.hospital_id,p5)))
//                                .and((openSat(hospitalTime.hospital.hospital_id,sat)).or(openSun(hospitalTime.hospital.hospital_id,sun)).or(openHoliday(hospitalTime.hospital.hospital_id,holiday)).or(openNight(hospitalTime.hospital.hospital_id,night))))
                ).distinct().fetch();
    }

    /**
     * 거리 5km
     */
    public BooleanExpression locationBetween(double e, double w, double s, double n) {
        if (e == 0) return null;
        return hospital.hospital_x.between(n, s).and(hospital.hospital_y.between(w, e));
    }

    /**
     * 진료과목 필터
     */
    public BooleanExpression partEq(NumberPath<Long> id, int partName) {
        if (partName == 0) return null; //전체과목은 필터 필요없어
//        return hospital.hospitalParts.get(id).hospital_part_name.eq(partName);
        return hospitalPart.hospital_part_name.eq(partName).and(hospitalPart.hospital.hospital_id.eq(id));
    }

    /**
     * 토요일 진료
     */
    public BooleanExpression openSat(NumberPath<Long> id,int sat) {
        if (sat == 0) return null;
        return hospitalTime.hospital_time_sat.ne("null").and(hospitalTime.hospital.hospital_id.eq(id));
    }

    /**
     * 일요일 진료
     */
    public BooleanExpression openSun(NumberPath<Long> id,int sun) {
        if (sun == 0) return null;
        return hospitalTime.hospital_time_sun.ne("null").and(hospitalTime.hospital.hospital_id.eq(id));
    }

    /**
     * 공휴일 진료
     */
    public BooleanExpression openHoliday(NumberPath<Long> id,int holiday) {
        if (holiday == 0) return null;
        return hospitalTime.hospital_time_holiday.ne(0).and(hospitalTime.hospital.hospital_id.eq(id));
    }

    /**
     * 야간진료
     */
    public BooleanExpression openNight(NumberPath<Long> id,int night) {
        if (night == 0) return null;
        return hospitalTime.hospital_time_fri_night.ne(0).and(hospitalTime.hospital.hospital_id.eq(id));
    }

}
