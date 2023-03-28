package com.roller.doc.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.DrugDesc;

@Repository
public interface DrugDescRepository extends JpaRepository<DrugDesc, Long> {
	@Query(value = "SELECT * FROM drug_desc WHERE drug_id =:drugId", nativeQuery = true)
	DrugDesc selectDrugDesc(@Param("drugId")int drug_id);
}
