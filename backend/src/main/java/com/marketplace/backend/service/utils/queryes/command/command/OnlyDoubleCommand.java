package com.marketplace.backend.service.utils.queryes.command.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.command.AbstractCommand;


public class OnlyDoubleCommand extends AbstractCommand{
    public OnlyDoubleCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString() {
        return null;
    }


}
