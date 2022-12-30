package com.marketplace.backend.service.utils.queryes.processors.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.processors.AbstractCommand;


public class OnlyBooleanCommand extends AbstractCommand {
    public OnlyBooleanCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString() {
        return null;
    }
}
