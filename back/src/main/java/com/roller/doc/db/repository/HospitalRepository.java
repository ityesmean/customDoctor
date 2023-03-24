package com.roller.doc.db.repository;

import com.roller.doc.db.entity.Hospital;
import com.roller.doc.db.entity.HospitalDesc;
import com.roller.doc.db.entity.HospitalPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    /**
     * 이름으로 병원검색하기
     */
    @Query(value = "SELECT * FROM hospital h WHERE h.hospital_name like %:word%", nativeQuery = true)
    List<Hospital> searchByHospitalName(@Param("word") String word);

    /**
     * 진료과목 가져오기
     */
    @Query(value = "select part from HospitalPart part where :id=part.hospital_id")
    List<HospitalPart> findHospitalPart(@Param("id") long id);

    /**
     * [filter]진료과목으로 병원찾기
     */
    @Query(value = "select part from HospitalPart part where :id=part.hospital_id and :no=part.hospital_part_name")
    List<HospitalPart> searchByHospitalPart(@Param("id") long id, @Param("no") int no);

    /**
     * [filter]거리로 병원찾기 (5km 반경 내)
     */
    @Query(value = "select h from Hospital h where (h.hospital_x between :n and :s) AND (h.hospital_y between :w and :e)")
    List<Hospital> findHospitalLocation(@Param("e") double e, @Param("w") double w, @Param("s") double s, @Param("n") double n);

    /** id로 병원찾기 */
//    Hospital findHospitalByHospital_id(int id);

    /** [filter] 운영시간으로 병원찾기*/

    /**
     * 병원 상세보기
     */
    @Query(value = "select hd from HospitalDesc hd where :id=hd.hospital_id")
    HospitalDesc findHospitalDesc(@Param("id") long id);
}
