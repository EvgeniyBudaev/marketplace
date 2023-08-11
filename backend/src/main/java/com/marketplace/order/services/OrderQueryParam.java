package com.marketplace.order.services;

import org.springframework.util.MultiValueMap;

import java.util.List;

public interface OrderQueryParam {
    MultiValueMap<String, String> getRawAttribute();

    Integer getCurrentPage();

    Integer getPageSize();

    List<String> getStatuses();
}
