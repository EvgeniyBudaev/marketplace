package com.marketplace.order.services.impl;

import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.order.services.OrderQueryParam;
import org.springframework.lang.Nullable;
import org.springframework.util.MultiValueMap;

import java.util.Collections;
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
    private static final Map<String, String> searchFields ;
    static {
        Map<String, String> aMap = new HashMap<>();
        aMap.put("email","recipientEmail");
        aMap.put("phone","recipientPhone");
        searchFields = Collections.unmodifiableMap(aMap);
    }

    public OrderQueryParamImpl(MultiValueMap<String, String> paramValue) {
        this.param = paramValue;
        List<String> pageList = paramValue.remove("page");
        if (pageList == null || pageList.isEmpty()) {
            this.currentPage = 1;
        } else {
            int currentPage = Integer.parseInt(pageList.get(0));
            this.currentPage = Math.max(currentPage, 1);
        }
        List<String> pageSizeList = paramValue.remove("size");
        if (pageSizeList == null || pageSizeList.isEmpty()) {
            this.pageSize = 5;
        } else {
            int pageSize = Integer.parseInt(pageSizeList.get(0));
            this.pageSize = Math.max(pageSize, 5);
        }
        this.orderStatuses = paramValue.remove("statuses");
        this.searchParam = new HashMap<>();
        List<String> rawSearchParam = paramValue.remove("search");
        if (rawSearchParam != null && !rawSearchParam.isEmpty()) {
            for (String rawParamString : rawSearchParam) {
                if (rawParamString.contains(":")) {
                    String[] concrete = rawParamString.split(":");
                    String field = searchFields.get(concrete[0].strip());
                    if(field==null){
                        throw new OperationNotAllowedException("Неизвестное поле поиска: "+concrete[0]);
                    }
                    this.searchParam.put(field, "%"+concrete[1].strip()+"%");
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
