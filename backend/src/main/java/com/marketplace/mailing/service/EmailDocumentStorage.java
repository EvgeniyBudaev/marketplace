package com.marketplace.mailing.service;

import com.marketplace.order.events.EOrderEvents;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service
public interface EmailDocumentStorage {
   Document getHTMLDocument(EOrderEvents event);
}
