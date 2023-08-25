package com.marketplace.order.events;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
@Getter
public class AppOrderEvent extends ApplicationEvent {
    private final OrderEvents orderEvents;
    public AppOrderEvent(OrderEvents orderEvents) {
        super(orderEvents);
        this.orderEvents = orderEvents;
        System.out.println("Событие произошло");
    }
}
