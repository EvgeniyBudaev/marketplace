package com.marketplace.backend.repository.values;

import com.marketplace.backend.model.values.DoubleValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoubleValueRepository extends JpaRepository<DoubleValue,Long> {
}
