package com.roller.doc.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.DrugMyPill;

@Repository
public interface DrugMyPillRepository extends JpaRepository<DrugMyPill, Long> {
	@Query(value = "SELECT * FROM drug_my_pill WHERE drug_my_id=:drugMyId", nativeQuery = true)
	List<DrugMyPill> findMyPillList(@Param("drugMyId")Long drug_my_id);
}
