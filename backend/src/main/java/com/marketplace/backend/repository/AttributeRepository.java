package com.marketplace.backend.repository;

import com.marketplace.backend.model.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    Optional<Attribute> findAttributeByAliasAndEnabledIsTrue(String alias);
}
