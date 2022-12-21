package com.marketplace.auth.repository;

import com.marketplace.auth.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser,Long> {
    Optional<AppUser> findByEmailAndEnabledTrue(String email);
    Optional<AppUser> findByPhoneAndEnabledTrue(String phone);
}
