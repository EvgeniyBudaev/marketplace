package com.marketplace.mailing.service.impl;

import com.marketplace.mailing.service.EmailDocumentStorage;
import com.marketplace.order.events.EOrderEvents;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.EnumMap;
import java.util.Map;
@Service
public class EmailDocumentStorageImpl implements EmailDocumentStorage {
    private final Map<EOrderEvents, Document> storage = new EnumMap<>(EOrderEvents.class);
    @Override
    public Document getHTMLDocument(EOrderEvents event) {
        return storage.get(event);
    }

    @PostConstruct
    public void init() throws IOException {
        File file = ResourceUtils.getFile("classpath:template.html");
        Document doc = Jsoup.parse(file, "UTF-8");
        storage.put(EOrderEvents.ORDER_CREATE,doc);
    }
}
