package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

public interface QueryCommandBuilder {
    AbstractProductCommand createJpqlQueryCommand(ProductQueryParam queryParam);
}
