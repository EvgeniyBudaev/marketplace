package com.marketplace.backend.service.utils.queryes.catalog.processor;

import com.marketplace.backend.service.utils.queryes.CatalogQueryParam;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortDirection;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortedFields;

import java.util.Map;

public class CatalogQueryProcessorImpl implements CatalogQueryProcessor{
    private final CatalogQueryParam param;
    public CatalogQueryProcessorImpl(CatalogQueryParam param) {
        this.param = param;
    }

    @Override
    public String getCountQuery() {
       return "select count (c) from Catalog as c where c.enabled=true";
    }

    @Override
    public String getMainQuery() {
        StringBuilder queryString = new StringBuilder("select c from Catalog  as c where c.enabled=true order by ");
        Map<ESortedFields, ESortDirection> paramMap = param.getSortedParam();
        if(paramMap.isEmpty()){
            String query = queryString.append(" name asc").toString();
            System.out.println(query);
            return query;
        }
        paramMap.forEach((x,y)->{
            if(x==null){
                x=ESortedFields.NAME;
            }
            if(y==null){
               y = ESortDirection.ASC;
            }
            queryString.append(x.getFiled()).append(" ").append(y.getDirection()).append(",");
        });
        String finalQueryString = queryString.substring(0,queryString.length()-1);
        System.out.println(finalQueryString);
        return finalQueryString;
    }
}
