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
    //이름으로 병원검색하기
    @Query(value = "SELECT h.hospital_id,h.hospital_name,h.hospital_code,h.hospital_tel,h.hospital_star" +
            " FROM hospital h WHERE ST_Distance_Sphere(h.hospital_location, point(:x, :y))<=3000 " +
            "AND h.hospital_name LIKE '%:word%' ORDER BY ST_Distance_Sphere(h.hospital_location, point(:x, :y))", nativeQuery = true)
    List<Hospital> searchByHospitalName(@Param("word") String word,@Param("x") double x, @Param("y") double y);

    //[filter]NKm 안의 병원찾기 default=3000
    @Query(value = "SELECT h FROM Hospital h WHERE ST_Distance_Sphere(h.hospital_location, point(:x, :y))<:d" +
            " ORDER BY ST_Distance_Sphere(h.hospital_location, point(:x, :y)", nativeQuery = true)
    List<Hospital> searchByHospitalLocation(@Param("x") double x, @Param("y") double y, @Param("d") int d);

    //[filter]진료과목으로 병원찾기
    @Query(value = "select h from Hospital h, Hospital_part part where ST_Distance_Sphere(h.hospital_location, point(:x, :y))<3000 " +
            "and :no=part.hospital_part_name ORDER BY ST_Distance_Sphere(h.hospital_location, point(:x, :y))", nativeQuery = true)
    List<Hospital> searchByHospitalPart(@Param("x") double x, @Param("y") double y, @Param("no") int no);

    //진료과목 가져오기
    @Query(value = "select part from HospitalPart part where :id=part.hospital_part_id")
    List<HospitalPart> findHospitalPart(@Param("id") int id);
    //[filter] 운영시간으로 병원찾기

    //병원 상세보기
    @Query(value = "select hd from HospitalDesc hd where :id=hd.hospital.hospital_id")
    HospitalDesc findHospitalDesc(@Param("id") int id);
}
