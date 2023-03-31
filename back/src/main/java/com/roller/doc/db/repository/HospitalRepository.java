package com.roller.doc.db.repository;

import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalDesc;
import com.roller.doc.db.entity.HospitalPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    /**
     * 진료과목 가져오기
     */
    @Query(value = "select part from HospitalPart part where :id=part.hospital.hospital_id")
    List<HospitalPart> findHospitalPart(@Param("id") long id);

    /**
     * 병원 상세보기
     */
    @Query(value = "select hd from HospitalDesc hd where :id=hd.hospital_id")
    Optional<HospitalDesc> findHospitalDesc(@Param("id") long id);

}
