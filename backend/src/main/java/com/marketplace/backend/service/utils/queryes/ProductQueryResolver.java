package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ProductQueryResolver {
    String getSelectWithFilters();
    String getCountWithFilters();
    Integer getCurrentPage();
    Integer getPageSize();
    String getCatalogAlias();
    Set<String> getAttributesAlias();
    Map<String,Object> getQueryParameters();
    MultiValueMap<EAttributeType,Attribute> getAttributes();
    MultiValueMap<String, String> getParameters();
    void setAttributes(List<Attribute> attributes);

    void resolveQuery(String httpQuery);
}
