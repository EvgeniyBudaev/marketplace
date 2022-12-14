package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.service.utils.queryes.command.QueryCreateCommand;
import com.marketplace.backend.service.utils.queryes.command.QueryCreateExecutorImpl;

import java.util.Map;


public class ProductQueryResolverImpl implements ProductQueryResolver {
    private final ProductQueryParam queryParam;

    private String queryString;
    private Map<String, Object> queryParameters;

    public ProductQueryResolverImpl(ProductQueryParam queryParam) {
        this.queryParam = queryParam;
    }


    @Override
    public String getSelectWithFilters() {
        return "SELECT p "+queryString;
    }

    @Override
    public String getCountWithFilters() {
        return "SELECT count (p) "+queryString;
    }



    @Override
    public Map<String, Object> getQueryParameters() {
        return this.queryParameters;
    }


    @Override
    public void init() {
        QueryCreateCommand command =new QueryCreateExecutorImpl()
                .createJpqlQueryCommand(queryParam);
        this.queryString = command.createQueryString();
        this.queryParameters = command.getQueryParameters();
    }

}
