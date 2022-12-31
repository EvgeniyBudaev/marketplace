package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;


public interface ProductDao {

    ResponseProductDto findProductByAlias(String alias);


    Paging<ResponseProductDto> findProductsInCatalog(ProductQueryParam queryParam);

    Paging<ResponseProductDto> findProductLikeName(Integer page, Integer pageSize, String find);
}
