package com.marketplace.backend.service.utils.queryes.processors;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractCommand implements QueryProcessorParam {
    private final Map<String,Object> param;
    private final ProductQueryParam productQueryParam;
    public AbstractCommand(ProductQueryParam param){
       this.productQueryParam = param;
       this.param = new HashMap<>();
    }
    @Override
    public String query() {
        StringBuilder sb = new StringBuilder(createSubQueryString());
        if(productQueryParam.getOnStock()!=null){
            if(productQueryParam.getOnStock()){
                sb.append(" AND p.count>0");
            }else {
                sb.append(" AND p.count=0");
            }
        }
        if(!productQueryParam.getSortedParam().isEmpty()){
            sb.append(" ORDER BY");
            for(Map.Entry<ESortedFields, ESortDirection> entry: productQueryParam.getSortedParam().entrySet()){
                sb.append(" p.").append(entry.getKey().getFiled());
                sb.append(" ").append(entry.getValue().getQuery()).append(",");
            }
        }
        if (sb.charAt(sb.length()-1)==','){
            sb.deleteCharAt(sb.length()-1);/*Удаляем последнюю запятую*/
        }
        return sb.toString();
    }

     protected abstract String createSubQueryString();

    public Map<String,Object> param(){
        return this.param;
    }

    protected ProductQueryParam getProductQueryParam(){
        return this.productQueryParam;
    }

}
