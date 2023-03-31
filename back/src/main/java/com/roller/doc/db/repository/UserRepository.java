package com.roller.doc.db.repository;

import com.roller.doc.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserEmail(String email);

}
