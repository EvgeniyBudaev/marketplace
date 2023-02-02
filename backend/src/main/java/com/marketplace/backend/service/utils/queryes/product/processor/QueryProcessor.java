package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

public interface QueryProcessor {
    QueryProcessorParam getQuery(ProductQueryParam queryParam);
}
