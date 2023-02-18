package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductGetAllDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.QueryParam;


public interface ProductDao {

    Product findProductByAlias(String alias);


    Paging<ResponseProductDto> findProductsInCatalog(ProductQueryParam queryParam);

    Paging<ResponseProductDto> findProductLikeName(Integer page, Integer pageSize, String find);
    Paging<ResponseProductGetAllDto> findAll(QueryParam param);
}
