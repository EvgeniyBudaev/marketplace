package com.marketplace.mailing.service;

import com.marketplace.order.events.OrderEvents;
import org.springframework.stereotype.Service;

@Service
public interface EmailBodyProcessor {
    String getHtmlEmailBody(OrderEvents event);
}
