package com.marketplace.order.services;



public interface OrderUrlResolver {
    OrderQueryParam resolveQuery(String httpQuery);
}
