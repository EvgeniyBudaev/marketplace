package com.marketplace.backend.repository;

import com.marketplace.backend.entity.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {
}
