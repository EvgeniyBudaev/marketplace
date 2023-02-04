package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.service.utils.queryes.ESortDirection;
import com.marketplace.backend.service.utils.queryes.ESortedFields;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractProductCommand implements QueryProcessorParam {
    private final Map<String,Object> param;
    private final ProductQueryParam productQueryParam;
    public AbstractProductCommand(ProductQueryParam param){
       this.productQueryParam = param;
       this.param = new HashMap<>();
    }
    public static void sortedQueryBuild(StringBuilder sb, ProductQueryParam productQueryParam) {
        if(!productQueryParam.getSortedParam().isEmpty()){
            sb.append(" ORDER BY");
            for(Map.Entry<ESortedFields, ESortDirection> entry: productQueryParam.getSortedParam().entrySet()){
                sb.append(" p.").append(entry.getKey().getFiled());
                sb.append(" ").append(entry.getValue().getDirection()).append(",");
            }
        }
        if (sb.charAt(sb.length()-1)==','){
            sb.deleteCharAt(sb.length()-1);/*Удаляем последнюю запятую*/
        }
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
        sortedQueryBuild(sb, productQueryParam);
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
