package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;

import java.util.Map;

public interface ProductDao extends GeneralDao<Product> {

    Product findProductByAlias(String alias);

    Product save(RequestSaveProductDto dto);

    Paging<Product> findProductsInCatalogByAlias(String alias,
                                                 Integer page,
                                                 Integer pageSize,
                                                 Map<String,String> filters);
}
