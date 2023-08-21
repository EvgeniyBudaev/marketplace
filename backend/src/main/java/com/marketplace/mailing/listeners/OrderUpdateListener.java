package com.marketplace.mailing.listeners;


import com.marketplace.order.events.OrderUpdateEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class OrderUpdateListener implements ApplicationListener<OrderUpdateEvent> {
    @Override
    public void onApplicationEvent(OrderUpdateEvent event) {

    }
}
