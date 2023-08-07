package com.marketplace.order.services.impl;

import com.marketplace.order.services.OrderQueryParam;
import org.springframework.lang.Nullable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class OrderQueryParamImpl implements OrderQueryParam {
    private final MultiValueMap<String, String> param;
    private final Integer currentPage;
    private final Integer pageSize;
    @Nullable
    private final List<String> orderStatuses;
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
        this.orderStatuses = param.remove("statuses");

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
}
