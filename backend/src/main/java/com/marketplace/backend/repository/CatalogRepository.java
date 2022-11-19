package com.marketplace.backend.repository;

import com.marketplace.backend.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    Optional<Catalog> findCatalogByAlias(String alias);
}
