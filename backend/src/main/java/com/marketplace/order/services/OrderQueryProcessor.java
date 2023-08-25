package com.marketplace.order.services;

import com.marketplace.order.models.Order;

import javax.persistence.TypedQuery;

public interface OrderQueryProcessor {
    String getCountQuery();

    String getMainQuery();
    void setCountQueryParameters(TypedQuery<Long> query);
    void setMainQueryParameters(TypedQuery<Order> query);
}
