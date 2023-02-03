package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.service.utils.queryes.product.processor.ESortDirection;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortedFields;

import java.util.HashMap;

public interface CatalogQueryParam {
    Integer getPage();
    Integer getPageSize();
    HashMap<ESortedFields, ESortDirection> getSortedParam();

}
