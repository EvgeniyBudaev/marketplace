package com.marketplace.order.events.impl;

import com.marketplace.order.events.EOrderEvents;
import com.marketplace.order.events.OrderEvents;
import com.marketplace.order.models.Order;

public class OrderEventsImpl implements OrderEvents {
    private final Order order;
    private final EOrderEvents orderEvent;

    public OrderEventsImpl(Order order, EOrderEvents orderEvent) {
        this.order = order;
        this.orderEvent = orderEvent;
    }

    @Override
    public Order getOrder() {
        return order;
    }

    @Override
    public EOrderEvents getEvents() {
        return orderEvent;
    }
}
