package com.marketplace.backend.service.utils.queryes;

import java.util.HashMap;

public interface QueryParam {
    Integer getPage();
    Integer getPageSize();
    HashMap<ESortedFields, ESortDirection> getSortedParam();
    String getSearchString();

}
