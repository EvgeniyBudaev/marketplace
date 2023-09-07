package com.marketplace.mailing.service.impl;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.mailing.service.EmailBodyProcessor;
import com.marketplace.mailing.service.EmailDocumentStorage;
import com.marketplace.order.events.OrderEvents;
import com.marketplace.order.models.Order;
import com.marketplace.order.models.OrderItem;
import com.marketplace.properties.AppProperties;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.EmailProperty;
import com.marketplace.storage.services.DocumentStorageService;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;


@Component
public class EmailBodyProcessorImpl implements EmailBodyProcessor {
    private final EmailDocumentStorage emailDocumentStorage;
    private final DocumentStorageService documentStorageService;
    private final EmailProperty emailProperty;
    private final static List<String> fields;
    static {
        fields = new ArrayList<>(8);
        fields.add("orderNumber");
        fields.add("amount");
        fields.add("recipientName");
        fields.add("recipientPhone");
        fields.add("address");
        fields.add("floor");
        fields.add("paymentVariant");
        fields.add("managerEmail");
    }
    private final static List<String> rowFields;
    static {
        rowFields = new ArrayList<>();
        rowFields.add("itemName");
        rowFields.add("itemQuantity");
        rowFields.add("itemAmount");
    }


    @Autowired
    public EmailBodyProcessorImpl(EmailDocumentStorage emailDocumentStorage, DocumentStorageService documentStorageService, AppProperties appProperties) {
        this.emailDocumentStorage = emailDocumentStorage;
        this.documentStorageService = documentStorageService;
        this.emailProperty = (EmailProperty) appProperties.getProperty(EPropertiesType.EMAIL);
    }

    @Override
    public String getHtmlEmailBody(OrderEvents event) {
        Document template = this.emailDocumentStorage.getHTMLDocument(event.getEvents());
        Document document = template.clone();
        Elements elementsSpan =document.select("span[datafld]");
        for(Element elm: elementsSpan){
            String value = processSpan(elm.attr("datafld"),event.getOrder());
            if(value==null){
                throw  new IllegalRequestParam("Шаблон содержит не поддерживаемый параметр "+ elm.attr("datafld"));
            }
            elm.appendText(value);
        }
        Elements elementsA = document.select("a[datafld]");
        for(Element elm: elementsA){
            processA(elm);
        }
        Element elementTableRow = document.selectFirst("tr[appFor]");
        if(elementTableRow==null){
            return document.html();
        }
        Element parentElement = elementTableRow.parent();
        if(parentElement==null){
            throw  new IllegalRequestParam("В шаблоне отсутствует родительский элемент для атрибута appFor");
        }
        Set<OrderItem> orders = event.getOrder().getOrderItems();
        List<Long> productIds = orders.stream().map(OrderItem::getProductId).toList();
        Map<Long,String> itemsUrls = documentStorageService.getDefaultImageUrl(productIds);
        orders.forEach(item->{
            Element newElement = elementTableRow.clone();
            processRowTable(item,newElement,itemsUrls);
            parentElement.appendChild(newElement);
        });
        elementTableRow.remove();
        return document.html();
    }

    private String processSpan(String param, Order order){
        if(!fields.contains(param)){
            throw  new IllegalRequestParam("Шаблон содержит не поддерживаемый параметр "+param);
        }
        switch (param) {
            case "orderNumber" -> {
                return "# " + order.getId();
            }
            case "amount" -> {
                return order.getAmount();
            }
            case "recipientName" -> {
                return order.getRecipientName();
            }
            case "recipientPhone" -> {
                return order.getRecipientPhone();
            }
            case "address" ->{
                return order.getAddress();
            }
            case "floor" ->{
                return order.getFloor();
            }
            case "paymentVariant" ->{
                return order.getPaymentVariant().getName();
            }
        }
        return null;
    }
    private void processA(Element element){
        String param = element.attr("datafld");
        if(!fields.contains(param)){
            throw  new IllegalRequestParam("Шаблон содержит не поддерживаемый параметр "+param);
        }
        switch (param){
            case "managerEmail"->{
                element.appendText(emailProperty.getEmail());
                element.attr("href","mailto:"+emailProperty.getEmail());
            }
        }
    }

    private void processRowTable(OrderItem orderItem, Element newElement, Map<Long,String> itemsUrls){
        Elements elemWithParams = newElement.select("[rowData]");
        elemWithParams.forEach(elm->{
            String param = elm.attr("rowData");
            if(!rowFields.contains(param)){
                return;
            }
            switch (param){
                case "itemName" -> elm.appendText(orderItem.getProductName());
                case "itemQuantity" -> elm.appendText(String.valueOf(orderItem.getQuantity()));
                case "itemAmount" -> elm.appendText(orderItem.getAmount().toPlainString());
            }
        });
        Elements imgElement = newElement.select("img[imgSrc]");
        if(!imgElement.isEmpty()){
           imgElement.forEach(elm->{
               if(itemsUrls.containsKey(orderItem.getProductId())){
                   elm.attr("src",itemsUrls.get(orderItem.getProductId()));
                   }
               }
           );
        }
    }
}
