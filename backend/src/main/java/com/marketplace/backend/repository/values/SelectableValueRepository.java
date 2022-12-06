package com.marketplace.backend.repository.values;

import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectableValueRepository extends JpaRepository<SelectableValue,Long> {
}
