package com.marketplace.backend.dto.product.request;


import java.util.Collection;

public interface RequestSaveOrUpdate {
    Long getId();

    String getName();

    String getDescription();

    String getAlias();

    String getCatalogAlias();

    Integer getCount();

    java.math.BigDecimal getPrice();

    java.util.Set<Long> getSelectableValues();

    Collection<NumericValue> getNumericValues();


}
