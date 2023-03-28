package com.roller.doc.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.Drug;
import com.roller.doc.db.entity.DrugAvoid;
import com.roller.doc.db.entity.DrugDesc;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

	@Query(value = "SELECT * FROM drug WHERE drug_name LIKE %:drugName%", nativeQuery = true)
	List<Drug> findOneByName(@Param("drugName")String drug_name);

	@Query(value = "SELECT * FROM drug WHERE drug_type =:drugType and drug_line =:drugLine and (drug_colorb =:drugColor or drug_colorf =:drugColor) and (drug_markb =:drugMark or drug_markf =:drugMark)", nativeQuery = true)
	List<Drug> findDrug(@Param("drugType")String drug_type, @Param("drugLine")String drug_line,
		@Param("drugColor")String drug_color, @Param("drugMark")String drug_mark);

	@Query(value = "SELECT * FROM drug WHERE drug_id =:drugId", nativeQuery = true)
	Drug selectDrug(@Param("drugId")Long drug_id);
}
