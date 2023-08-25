package com.marketplace.mailing.service;

import com.marketplace.order.events.OrderEvents;
import org.springframework.stereotype.Component;

@Component
public interface EmailBodyProcessor {
    String getHtmlEmailBody(OrderEvents event);
}
