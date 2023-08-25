package com.marketplace.order.events;

import com.marketplace.order.models.Order;

public interface OrderEvents {
    Order getOrder();
    EOrderEvents getEvents();
}
