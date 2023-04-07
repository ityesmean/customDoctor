package com.roller.doc.db.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.roller.doc.config.QuerydslConfig;
import com.roller.doc.db.entity.Hospital;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.roller.doc.db.entity.QHospital.*;
import static com.roller.doc.db.entity.QHospitalPart.*;
import static com.roller.doc.db.entity.QHospitalTime.*;
import lombok.extern.log4j.Log4j2;

@Log4j2
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
                .where(
                        keywordSearch(word),
                        locationBetween(e, w, s, n)
                )
                .fetch();
    }

    /**
     * 거리5km+진료과목+운영시간 필터
     */
    public List<Hospital> useFilterHospital(double e, double w, double s, double n, List<Integer> part, List<Integer> open) {
        JPAQueryFactory query = querydslConfig.jpaQueryFactory();
        //명령어 매핑
        int[] partTmp = new int[5];
        for (int i = 0; i < part.size(); i++) {
            partTmp[i] = part.get(i);
        }
        BooleanBuilder builder = new BooleanBuilder();
        for (int i = 0; i < open.size(); i++) {
            switch (open.get(i)) {
                case 1:
                    builder.or(hospitalTime.hospitalTimeSat.ne("null"));
                    break;
                case 2:
                    builder.or(hospitalTime.hospitalTimeSun.ne("null"));
                    break;
                case 3:
                    builder.or(hospitalTime.hospitalTimeHoliday.eq(1));
                    break;
                case 4:
                    builder.or(hospitalTime.hospitalTimeMonNight.eq(1));
                    break;
            }
        }
        if (open.get(0) == 0 && part.get(0) == 0) { //필터가 없는데 검색누른경우
            return query.select(hospital)
                    .from(hospital)
                    .where(locationBetween(e, w, s, n))
                    .distinct().fetch();
        }
        if (part.get(0) == 0 && open.get(0) != 0) { //진료과목 필터가 없고 시간필터가 있는 경우
            return query.select(hospital)
                    .from(hospital)
                    .innerJoin(hospitalTime).on(hospital.hospital_id.eq(hospitalTime.hospital.hospital_id))
                    .where(locationBetween(e, w, s, n), builder)
                    .distinct().fetch();
        }
        if (open.get(0) == 0 && part.get(0) != 0) { //시간 필터 없고 과목필터가 있는 경우
            return query.select(hospital)
                    .from(hospital)
                    .innerJoin(hospitalPart).fetchJoin().on(partEq(hospital.hospital_id, partTmp[0]).or(partEq(hospital.hospital_id, partTmp[1])).or(partEq(hospital.hospital_id, partTmp[2])).or(partEq(hospital.hospital_id, partTmp[3])).or(partEq(hospital.hospital_id, partTmp[4])))
                    .where(locationBetween(e, w, s, n))
                    .distinct().fetch();
        }
        return query.select(hospital)
                .from(hospital)
                .innerJoin(hospitalPart).fetchJoin().on(partEq(hospital.hospital_id, partTmp[0]).or(partEq(hospital.hospital_id, partTmp[1])).or(partEq(hospital.hospital_id, partTmp[2])).or(partEq(hospital.hospital_id, partTmp[3])).or(partEq(hospital.hospital_id, partTmp[4])))
                .innerJoin(hospitalTime).on(hospital.hospital_id.eq(hospitalTime.hospital.hospital_id))
                .where(locationBetween(e, w, s, n), builder)
                .distinct().fetch();
    }

    /**
     * 거리 5km
     */
    public BooleanExpression locationBetween(double e, double w, double s, double n) {
        if (e == 0) return null;
        return hospital.hospital_x.between(w, e).and(hospital.hospital_y.between(s, n));
    }

    /**
     * 진료과목 필터
     */
    public BooleanExpression partEq(NumberPath<Long> id, int partName) {
        if (partName == 0) return null;
        return hospitalPart.hospital_part_name.eq(partName).and(hospitalPart.hospital.hospital_id.eq(id));
    }

    /**
     * 이름 fulltext search
     */
    public BooleanExpression keywordSearch(String word) {
        if (word == null) {
            return null;
        } else {
            return hospital.hospital_name.contains(word);
           // NumberTemplate booleanTemplate = Expressions.numberTemplate(Double.class,
           //         "function('match',{0},{1})", hospital.hospital_name, word);
           // return booleanTemplate.gt(0);
        }
    }

}
