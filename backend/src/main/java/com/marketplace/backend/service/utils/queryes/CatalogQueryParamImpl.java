package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.service.utils.queryes.product.processor.ESortDirection;
import com.marketplace.backend.service.utils.queryes.product.processor.ESortedFields;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.HashMap;

@Data
public class CatalogQueryParamImpl implements CatalogQueryParam{
    private Integer page;
    private Integer pageSize;
    private HashMap<ESortedFields, ESortDirection> sortedParam = new HashMap<>(3);

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("page", page)
                .append("pageSize", pageSize)
                .append("sortedParam", sortedParam.toString())
                .toString();
    }
}
