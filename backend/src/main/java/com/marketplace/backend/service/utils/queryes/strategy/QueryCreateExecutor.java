package com.marketplace.backend.service.utils.queryes.strategy;

import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;

public interface QueryCreateExecutor {
    QueryCreateCommand createJpqlQueryCommand(ProductQueryResolver resolver,String command);
}
