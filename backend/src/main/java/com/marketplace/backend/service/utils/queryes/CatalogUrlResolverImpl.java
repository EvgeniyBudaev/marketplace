package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.exception.OperationNotAllowedException;

import java.util.Arrays;

public class CatalogUrlResolverImpl implements CatalogUrlResolver{

    @Override
    public CatalogQueryParam resolveQueryString(String httpQuery) {
        CatalogQueryParamImpl param = new CatalogQueryParamImpl();
        if(httpQuery.isEmpty()){
            return loadDefault(param);
        }
        String[] paramArray = httpQuery.split("&");
        for(String queryParam: paramArray){

        }
        System.out.println(Arrays.toString(paramArray));
        return param;
    }

    private  CatalogQueryParamImpl loadDefault( CatalogQueryParamImpl param){
        return param;
    }
}
