package com.marketplace.backend.repository.values;

import com.marketplace.backend.model.values.StringValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StringValueRepository extends JpaRepository<StringValue,Long> {
}
