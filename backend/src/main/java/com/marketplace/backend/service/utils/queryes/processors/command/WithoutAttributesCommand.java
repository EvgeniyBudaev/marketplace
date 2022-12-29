package com.marketplace.backend.service.utils.queryes.processors.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.processors.AbstractCommand;

public class WithoutAttributesCommand extends AbstractCommand{
    public WithoutAttributesCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString()  {
        super.param().put("alias",getProductQueryParam().getCatalogAlias());
        return "from Product as p where p.catalog.alias=:alias and p.enabled=true";
    }
}
