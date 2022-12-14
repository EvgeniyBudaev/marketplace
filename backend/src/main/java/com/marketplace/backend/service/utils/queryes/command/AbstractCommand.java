package com.marketplace.backend.service.utils.queryes.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractCommand implements QueryCreateCommand {
    private final ProductQueryParam queryParam;
    private final Map<String, Object> queryParameters = new HashMap<>();

    public AbstractCommand(ProductQueryParam queryParam) {
        this.queryParam=queryParam;
    }

    @Override
    public String createQueryString() {
        StringBuilder sb = new StringBuilder(createSubQueryString());
        if(queryParam.getOnStock()!=null){
            if(queryParam.getOnStock()){
                sb.append(" AND p.count>0");
            }else {
                sb.append(" AND p.count=0");
            }
        }
        if(!queryParam.getSortedParam().isEmpty()){
            sb.append(" ORDER BY");
            for(Map.Entry<ESortedFields, ESortDirection> entry:queryParam.getSortedParam().entrySet()){
                sb.append(" p.").append(entry.getKey().getFiled());
                sb.append(" ").append(entry.getValue().getQuery()).append(",");
            }
        }
        if (sb.charAt(sb.length()-1)==','){
            sb.deleteCharAt(sb.length()-1);/*Удаляем последнюю запятую*/

        }
        return sb.toString();
    }

    public Map<String, Object> getQueryParameters() {
        return queryParameters;
    }

    public ProductQueryParam getQueryParam() {
        return queryParam;
    }

    protected abstract String createSubQueryString();
}
