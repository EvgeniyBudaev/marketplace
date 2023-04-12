package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveOrUpdate;
import com.marketplace.backend.model.Product;


public interface ManageProductDao {
    Product save(RequestSaveOrUpdate dto);

    Product update(RequestSaveOrUpdate dto);

    Integer delete(String alias);
}
