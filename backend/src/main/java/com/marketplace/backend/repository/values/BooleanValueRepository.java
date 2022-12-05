package com.marketplace.backend.repository.values;

import com.marketplace.backend.model.values.BooleanValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooleanValueRepository extends JpaRepository<BooleanValue,Long> {
}
