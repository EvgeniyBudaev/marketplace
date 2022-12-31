package com.marketplace.backend.service.utils.queryes.processors;

import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.List;

public interface QueryChainProcessor {
    QueryProcessorParam attributeQuery(ProductQueryParam param);
    QueryProcessorParam productCountQuery(ProductQueryParam param);
    QueryProcessorParam productListQuery();
    QueryProcessorParam resultQuery(List<Product> param);
}
