package com.marketplace.backend.dao;

import com.marketplace.backend.model.Product;
import org.springframework.data.domain.Page;

public interface ProductDao extends GeneralDao<Product> {

    Page<Product> productWithPage(Integer pageNumber,Integer countOfPage);
}
