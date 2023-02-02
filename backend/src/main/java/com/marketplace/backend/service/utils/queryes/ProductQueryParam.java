package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortDirection;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortedFields;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ProductQueryParam {
    MultiValueMap<String, String> getRawAttribute();

    Integer getCurrentPage();

    Integer getPageSize();

    String getCatalogAlias();

    Set<String> getAttributesAlias();

    Map<ESortedFields, ESortDirection> getSortedParam();

    void setAttributes(List<Attribute> list);

    List<Attribute> getAttribute(EAttributeType attributeType);

    Boolean getOnStock();
}
