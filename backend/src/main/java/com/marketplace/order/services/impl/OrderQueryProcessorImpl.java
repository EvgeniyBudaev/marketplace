package com.marketplace.order.services.impl;


import com.marketplace.order.models.Order;
import com.marketplace.order.services.OrderQueryParam;
import com.marketplace.order.services.OrderQueryProcessor;

import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.Map;

public class OrderQueryProcessorImpl implements OrderQueryProcessor {
    private final OrderQueryParam queryParam;

    private final StringBuilder countQuery;
    private final StringBuilder mainQuery;
    private final Map<String, Object> paramMap;

    public OrderQueryProcessorImpl(OrderQueryParam queryParam) {
        this.queryParam = queryParam;
        this.countQuery = new StringBuilder("SELECT count(o) FROM Order as o");
        this.mainQuery = new StringBuilder("SELECT o FROM Order as o");
        this.paramMap = new HashMap<>();
        this.completeStatusesQuery();
        this.completeSearchQuery();
    }



    @Override
    public String getCountQuery() {
        return this.countQuery.toString();
    }

    @Override
    public String getMainQuery() {
        return this.mainQuery.toString();
    }

    @Override
    public void setCountQueryParameters(TypedQuery<Long> query) {
        this.paramMap.forEach(query::setParameter);
    }
    @Override
    public void setMainQueryParameters(TypedQuery<Order> query) {
        this.paramMap.forEach(query::setParameter);
        query.setFirstResult((queryParam.getCurrentPage() - 1) * queryParam.getPageSize());
        query.setMaxResults(queryParam.getPageSize());
    }

    private void completeStatusesQuery(){
        if(this.queryParam.getStatuses()==null || this.queryParam.getStatuses().isEmpty()){
            this.mainQuery.append("  inner join fetch o.status as os");
            return;
        }
        this.countQuery.append(" inner join o.status as os where os.status in (:statuses)");
        this.mainQuery.append(" inner join fetch o.status as os where os.status in (:statuses)");
        this.paramMap.put("statuses",this.queryParam.getStatuses());
    }
    private void completeSearchQuery() {
        if(this.queryParam.getSearchParam()==null || this.queryParam.getSearchParam().isEmpty()){
           return;
        }
        if (this.queryParam.getStatuses()==null || this.queryParam.getStatuses().isEmpty()){
            this.countQuery.append(" where");
            this.mainQuery.append(" where");
        }else {
            this.countQuery.append(" and");
            this.mainQuery.append(" and");
        }

        this.queryParam.getSearchParam().forEach((field, value)->{
            this.countQuery.append(" lower (o.").append(field).append(")  like lower(:").append(field).append(")").append(" and");
            this.mainQuery.append(" lower (o.").append(field).append(")  like lower(:").append(field).append(")").append(" and");
            this.paramMap.put(field,value);
        });
        this.mainQuery.delete(this.mainQuery.length()-4,this.mainQuery.length());
        this.countQuery.delete(this.countQuery.length()-4,this.countQuery.length());
        System.out.println(this.countQuery);
    }
}
