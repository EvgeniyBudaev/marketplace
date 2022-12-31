package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Product;

public interface ManageProductDao extends GeneralDao<Product>{
    void save(Product product);
    Product save(RequestSaveProductDto dto);
    void delete(String alias);
}
