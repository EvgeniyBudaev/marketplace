package com.marketplace.backend.repository.values;

import com.marketplace.backend.model.values.IntegerValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntegerValueRepository  extends JpaRepository<IntegerValue,Long> {
}
