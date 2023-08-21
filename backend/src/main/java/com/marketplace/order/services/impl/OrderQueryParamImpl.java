package com.marketplace.order.services.impl;

import com.marketplace.order.services.OrderQueryParam;
import org.springframework.lang.Nullable;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderQueryParamImpl implements OrderQueryParam {
    private final MultiValueMap<String, String> param;
    private final Integer currentPage;
    private final Integer pageSize;
    @Nullable
    private final List<String> orderStatuses;
    private final Map<String, String> searchParam;
    public OrderQueryParamImpl (MultiValueMap<String, String> param){
        this.param = param;
        List<String> pageList = param.remove("page");
        if (pageList == null || pageList.isEmpty()) {
            this.currentPage=1;
        } else {
            int currentPage = Integer.parseInt(pageList.get(0));
            this.currentPage = Math.max(currentPage, 1);
        }
        List<String> pageSizeList = param.remove("size");
        if (pageSizeList == null || pageSizeList.isEmpty()) {
            this.pageSize=5;
        } else {
            int pageSize = Integer.parseInt(pageSizeList.get(0));
            this.pageSize = Math.max(pageSize, 5);
        }
        this.searchParam = new HashMap<>();
        this.orderStatuses = param.remove("statuses");
        List<String> rawSearchParam = param.remove("search");
        if(rawSearchParam != null && !rawSearchParam.isEmpty()){
            String rawParamString = rawSearchParam.get(0);
            if (rawParamString.contains(",")){
               String[] rawElementsParam = rawParamString.split(",");
               for(String parameter : rawElementsParam){
                   if(parameter.contains(":")){
                       String[] concrete = parameter.split(":");
                       this.searchParam.put(concrete[0],concrete[1]);
                   }
               }
            }
        }
        System.out.println(this.searchParam);
    }
    @Override
    public MultiValueMap<String, String> getRawAttribute() {
        return this.param;
    }

    @Override
    public Integer getCurrentPage() {
        return this.currentPage;
    }

    @Override
    public Integer getPageSize() {
        return this.pageSize;
    }

    @Override
    public List<String> getStatuses() {
        return this.orderStatuses;
    }

    @Override
    public Map<String, String> getSearchParam() {
        return this.searchParam;
    }
}
