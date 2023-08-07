package com.marketplace.order.services.impl;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.order.services.OrderQueryParam;
import com.marketplace.order.services.OrderUrlResolver;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class OrderUrlResolverImpl implements OrderUrlResolver {
    @Override
    public OrderQueryParam resolveQuery(String httpQuery) {
        MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
        if(httpQuery==null){
            return new OrderQueryParamImpl(param);
        }
        if (httpQuery.isEmpty() || httpQuery.length() > 450) {
            throw new IllegalRequestParam("Не поддерживаемый запрос");
        }
        httpQuery = httpQuery.replaceAll("%2C", ",");
        String[] res1 = httpQuery.split("&");
        for (String row : res1) {
            String[] row1 = row.split("=");
            if (row1.length != 2) {
                throw new IllegalRequestParam("Не поддерживаемый запрос");
            }
            String[] row2 = row1[1].split(",");
            param.addAll(row1[0], List.of(row2));
        }
        return new OrderQueryParamImpl(param);
    }
}
