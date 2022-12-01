package com.marketplace.backend.repository;

import com.marketplace.backend.model.Product;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    Optional<Product> findProductByAlias(String alias);
}
