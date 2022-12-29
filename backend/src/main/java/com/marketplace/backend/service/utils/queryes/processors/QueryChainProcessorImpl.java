package com.marketplace.backend.service.utils.queryes.processors;

import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryChainProcessorImpl implements QueryChainProcessor{
    private AbstractCommand command ;

    @Override
    public QueryProcessorParam attributeQuery(ProductQueryParam param) {
        QueryProcessor processor = new QueryProcessorAttribute();
        return processor.getQuery(param);
    }

    @Override
    public QueryProcessorParam productCountQuery(ProductQueryParam param) {
        QueryCommandBuilder builder = new QueryCommandBuilderImpl();
        command = builder.createJpqlQueryCommand(param);
        return new QueryProcessorParamImpl("SELECT count (distinct p) "+command.query(), command.param());
    }

    @Override
    public QueryProcessorParam productIdListQuery() {
        return new QueryProcessorParamImpl("SELECT distinct p "+this.command.query(),this.command.param());
    }

    @Override
    public QueryProcessorParam resultQuery(List<Product> param) {
        String query ="SELECT p from Product as p where p in (:list)";
        Map<String, Object> queryParam = new HashMap<>(1);
        queryParam.put("list",param);
        return new QueryProcessorParamImpl(query,queryParam);
    }
}
