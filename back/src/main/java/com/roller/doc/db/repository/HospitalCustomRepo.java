package com.roller.doc.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.roller.doc.db.entity.Hospital;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.roller.doc.db.entity.QHospital.*;


@Repository
public class HospitalCustomRepo extends QuerydslRepositorySupport {
    private final JPAQueryFactory query;

    /**
     * Creates a new {@link QuerydslRepositorySupport} instance for the given domain type.
     *
     * @param domainClass must not be {@literal null}.
     */
    public HospitalCustomRepo(JPAQueryFactory query) {
        super(Hospital.class);
        this.query=query;
    }
    /** 이름으로 병원검색*/
    public List<Hospital> searchByHospitalName(String word, double e, double w, double s, double n){
        return query.selectFrom(hospital)
                .where(hospital.hospital_name.contains(word)
                        .and(hospital.hospital_x.between(n,s))
                        .and(hospital.hospital_y.between(w,e)))
                .fetch();
    }

    /** 거리5km+진료과목+운영시간 필터 */
    public List<Hospital> useFilterHospital(){
        return query.selectFrom(hospital)
                .fetch();

}

}
