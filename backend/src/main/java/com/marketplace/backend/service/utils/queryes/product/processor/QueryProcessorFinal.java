package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryProcessorFinal implements QueryProcessor {
    private final List<Product> productList;

    public QueryProcessorFinal(List<Product> productList) {
        this.productList = productList;
    }

    @Override
    public QueryProcessorParam getQuery(ProductQueryParam queryParam) {
        StringBuilder sb = new StringBuilder("SELECT p from Product as p where p in (:list)");
        AbstractProductCommand.sortedQueryBuild(sb, queryParam);
        Map<String, Object> param = new HashMap<>(1);
        param.put("list", productList);
        return new QueryProcessorParamImpl(sb.toString(), param);
    }
}
