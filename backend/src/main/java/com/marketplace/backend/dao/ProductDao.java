package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;


public interface ProductDao extends GeneralDao<Product> {

    Product findProductByAlias(String alias);

    Product save(RequestSaveProductDto dto);

    Paging<ResponseProductDto> findProductsInCatalog(ProductQueryParam queryParam);
}
