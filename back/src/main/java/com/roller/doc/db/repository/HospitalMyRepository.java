package com.roller.doc.db.repository;

import com.roller.doc.db.entity.HospitalMy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalMyRepository extends JpaRepository<HospitalMy, Long> {
//    Optional<HospitalMy> findByUser_idAndHospital_id(long userId, long hospitalId);

//    List<HospitalMy> findByUser_id(long userId);
}
