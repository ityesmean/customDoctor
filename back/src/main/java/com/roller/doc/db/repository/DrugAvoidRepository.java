package com.roller.doc.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.DrugAvoid;

@Repository
public interface DrugAvoidRepository extends JpaRepository<DrugAvoid, Long> {

	@Query(value = "SELECT * FROM drug_avoid WHERE drug_id =:drugId", nativeQuery = true)
	List<DrugAvoid> selectDrugAvoid(@Param("drugId")Long drug_id);

}
