package com.marketplace.backend.service.utils.queryes;

public interface CatalogUrlResolver {
    CatalogQueryParam resolveQueryString(String httpQuery);
}
