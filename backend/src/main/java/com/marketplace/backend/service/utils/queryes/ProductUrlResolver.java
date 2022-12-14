package com.marketplace.backend.service.utils.queryes;

public interface ProductUrlResolver {
    ProductQueryParam resolveQuery(String httpQuery);
}
