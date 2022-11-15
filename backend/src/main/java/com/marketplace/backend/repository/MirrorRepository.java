package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Mirror;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MirrorRepository extends JpaRepository<Mirror, Long> {
}
