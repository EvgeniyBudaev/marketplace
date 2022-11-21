package com.marketplace.backend.dao;

import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductDao extends GeneralDao<Product> {

    Page<Product> productWithPage(Integer pageNumber,Integer countOfPage);

    Product findProductByAlias(String alias);

    Product save(RequestSaveProductDto dto);

    List<Product> findProductsInCatalogByAlias(String alias);
}
