package com.marketplace.users.repository;


import com.marketplace.users.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface VerificationTokenRepository
        extends JpaRepository<VerificationToken,Long> {

}
