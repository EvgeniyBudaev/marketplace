package com.marketplace.backend.service.utils.queryes.product.processor.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.product.processor.AbstractProductCommand;

public class WithoutAttributesProductCommand extends AbstractProductCommand {
    public WithoutAttributesProductCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString() {
        super.param().put("alias", getProductQueryParam().getCatalogAlias());
        return "from Product as p where p.catalog.alias=:alias and p.enabled=true";
    }
}
