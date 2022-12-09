package com.marketplace.backend.service.utils.queryes.strategy.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.strategy.AbstractCommand;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateCommand;

public class OnlyBooleanCommand extends AbstractCommand implements QueryCreateCommand {
    public OnlyBooleanCommand(ProductQueryResolver resolver) {
        super(resolver);
    }

    @Override
    public String createQueryString() {
        return null;
    }
}
