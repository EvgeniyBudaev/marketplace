package com.marketplace.order.events;

import com.marketplace.order.models.Order;
import org.springframework.context.ApplicationEvent;

public class OrderUpdateEvent  extends ApplicationEvent {
    public OrderUpdateEvent(Order source) {
        super(source);
    }
}
