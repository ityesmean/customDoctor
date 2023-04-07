package com.roller.doc.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roller.doc.db.entity.DrugMy;

@Repository
public interface DrugMyRepository extends JpaRepository<DrugMy, Long> {

	/**
	 * 나의 약봉지 목록 조회
	 */
	@Query(value = "SELECT * FROM drug_my WHERE user_id =:userId AND drug_my_del = 0", nativeQuery = true)
	List<DrugMy> findList(@Param("userId")Long user_id);

	/**
	 * 나의 약봉지 삭제
	 */
	@Modifying
	@Query(value = "UPDATE DrugMy SET drug_my_del = 1 WHERE drug_my_id=:drugMyId")
	int deleteDrugMyById(@Param("drugMyId")Long drug_my_id);
}
