package com.marketplace.backend.service.utils.queryes.command.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.command.AbstractCommand;

public class WithoutAttributesCommand extends AbstractCommand{
    public WithoutAttributesCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString()  {
        super.getQueryParameters().put("alias",getQueryParam().getCatalogAlias());
        return "from Product as p where p.catalog.alias=:alias and p.enabled=true";
    }
}
