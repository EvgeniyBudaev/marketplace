package com.marketplace.users.repository;

import com.marketplace.users.model.AppRole;
import com.marketplace.users.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<AppRole,Long> {
    Optional<AppRole> getAppRoleByName(ERole role);
}
