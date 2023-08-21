package com.marketplace.order.events;

import com.marketplace.order.models.Order;
import org.springframework.context.ApplicationEvent;

public class OrderCreateEvent  extends ApplicationEvent {
    public OrderCreateEvent(Order source) {
        super(source);
    }
}
