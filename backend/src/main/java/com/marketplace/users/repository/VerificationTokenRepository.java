package com.marketplace.users.repository;


import com.marketplace.users.model.EmailVerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface VerificationTokenRepository
        extends JpaRepository<EmailVerifyToken,Long> {

}
