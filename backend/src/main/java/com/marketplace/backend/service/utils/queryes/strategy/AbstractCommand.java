package com.marketplace.backend.service.utils.queryes.strategy;

import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractCommand implements QueryCreateCommand {
    protected final ProductQueryResolver resolver;
    private final Map<String, Object> queryParameters = new HashMap<>();

    public AbstractCommand(ProductQueryResolver resolver) {
        this.resolver = resolver;
    }

    public Map<String, Object> getQueryParameters() {
        return queryParameters;
    }
}
