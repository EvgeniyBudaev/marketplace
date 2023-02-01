package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.service.utils.queryes.processors.ESortDirection;
import com.marketplace.backend.service.utils.queryes.processors.ESortedFields;
import lombok.Data;

import java.util.HashMap;

@Data
public class CatalogQueryParamImpl implements CatalogQueryParam{
    private Integer page;
    private Integer pageSize;
    private HashMap<ESortedFields, ESortDirection> sortedParam = new HashMap<>(3);
}
