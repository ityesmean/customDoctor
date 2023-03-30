package com.roller.doc.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.Drug;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

	@Query(value = "SELECT * FROM drug WHERE drug_name =:drugName", nativeQuery = true)
	Drug findOneByName(@Param("drugName")String drug_name);

	@Query(value = "SELECT * FROM drug WHERE drug_type =:drugType and drug_line =:drugLine and (drug_colorb =:drugColor or drug_colorf =:drugColor) and (drug_markb =:drugMark or drug_markf =:drugMark)", nativeQuery = true)
	Drug findDrug(@Param("drugType")String drug_type, @Param("drugLine")String drug_line,
		@Param("drugColor")String drug_color, @Param("drugMark")String drug_mark);
}
