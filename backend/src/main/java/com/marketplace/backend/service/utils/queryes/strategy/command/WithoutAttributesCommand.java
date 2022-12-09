package com.marketplace.backend.service.utils.queryes.strategy.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.strategy.AbstractCommand;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateCommand;

public class WithoutAttributesCommand extends AbstractCommand implements QueryCreateCommand {
    public WithoutAttributesCommand(ProductQueryResolver resolver) {
        super(resolver);
    }

    @Override
    public String createQueryString() {
        super.getQueryParameters().put("alias",resolver.getCatalogAlias());
        return "from Product as p where p.catalog.alias=:alias and p.enabled=true";
    }
}
