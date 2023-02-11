package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Product;

public interface ManageProductDao {
    Product save(RequestSaveProductDto dto);
    void delete(String alias);
}
