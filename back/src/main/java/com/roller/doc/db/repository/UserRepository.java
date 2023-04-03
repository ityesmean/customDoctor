package com.roller.doc.db.repository;

import com.roller.doc.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserEmail(String email);

    /**
     * userId로 user 정보 출력
     */
    @Transactional(readOnly = true)
    @Query(value = "SELECT * FROM user WHERE user_id =:userId", nativeQuery = true)
    public User findUser(@Param("userId") Long user_id);
}
