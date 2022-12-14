package com.marketplace.backend.service.utils.queryes;

import java.util.Map;


public interface ProductQueryResolver {
    String getSelectWithFilters();
    String getCountWithFilters();
    Map<String, Object> getQueryParameters();

    void init();
}
