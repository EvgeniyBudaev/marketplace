package com.marketplace.users.repository;

import com.marketplace.users.model.SessionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<SessionId, Long> {
    Optional<SessionId> getSessionIdByUuid(String uuid);
}
