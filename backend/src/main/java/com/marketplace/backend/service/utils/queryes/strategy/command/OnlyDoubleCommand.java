package com.marketplace.backend.service.utils.queryes.strategy.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.strategy.AbstractCommand;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateCommand;

public class OnlyDoubleCommand extends AbstractCommand implements QueryCreateCommand {
    public OnlyDoubleCommand(ProductQueryResolver resolver) {
        super(resolver);
    }

    @Override
    public String createQueryString() {
        return null;
    }
}
