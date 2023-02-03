package com.marketplace.backend.service.utils.queryes.processor;

import com.marketplace.backend.service.utils.queryes.CatalogQueryParam;
import com.marketplace.backend.service.utils.queryes.ESortDirection;
import com.marketplace.backend.service.utils.queryes.ESortedFields;

import java.util.Map;

public class CatalogQueryProcessorImpl implements QueryProcessor {
    private final CatalogQueryParam param;
    public CatalogQueryProcessorImpl(CatalogQueryParam param) {
        this.param = param;
    }

    @Override
    public String getCountQuery() {
        StringBuilder queryString = new StringBuilder("select count (c) from Catalog as c where c.enabled=true");
        if(param.getSearchString()!=null){
            queryString.append(" and lower (c.name) like lower (:param) ");
        }
       return queryString.toString();
    }

    @Override
    public String getMainQuery() {
        StringBuilder queryString = new StringBuilder("select c from Catalog  as c where c.enabled=true ");
        Map<ESortedFields, ESortDirection> paramMap = param.getSortedParam();
        if (param.getSortedParam()!=null){
            queryString.append("and lower (c.name) like lower (:param) ");
        }
        queryString.append("order by ");
        if(paramMap.isEmpty()){
            String query = queryString.append("name asc").toString();
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
