package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.Map;

public class QueryProcessorAttribute implements QueryProcessor {
    @Override
    public QueryProcessorParam getQuery(ProductQueryParam queryParam) {
        String query = "SELECT a from Attribute as a where a.alias in (:list)";
        Map<String, Object> param = new HashMap<>(1);
        param.put("list", queryParam.getAttributesAlias());
        return new QueryProcessorParamImpl(query, param);
    }
}
