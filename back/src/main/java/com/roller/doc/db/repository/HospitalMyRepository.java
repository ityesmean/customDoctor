package com.roller.doc.db.repository;

import com.roller.doc.db.entity.HospitalMy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HospitalMyRepository extends JpaRepository<HospitalMy, Long> {
    /**
     * 병원즐겨찾기 상태변경
     */
    @Modifying
    @Query(value = "update HospitalMy set hospital_my_del=:status where :userId=user_id and :hospitalId=hospital_id")
    void statusHospitalMy(@Param("userId") long userId, @Param("hospitalId") long hospitalId, @Param("status") boolean status);

    /**
     * 즐겨찾기 DB에 있는지
     */
    @Query(value = "select my from HospitalMy my where :hospitalId=my.hospital_id and :userId=my.user_id")
    Optional<HospitalMy> findHospitalMy(@Param("userId") long userId, @Param("hospitalId") long hospitalId);

    /**
     * 즐겨찾기 여부
     */
    @Query(value = "select my from HospitalMy my where :hospitalId=my.hospital_id and :userId=my.user_id and my.hospital_my_del=false")
    Optional<HospitalMy> isHospitalMy(@Param("userId") long userId, @Param("hospitalId") long hospitalId);

    /**
     * 병원 즐겨찾기 리스트
     */
    @Query(value = "select my from HospitalMy  my where :userId=my.user_id ")
    List<HospitalMy> listingHospitalMy(@Param("userId") long userId);
}
