package com.marketplace.backend.service.utils.queryes.command;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

public interface QueryCreateExecutor {
    QueryCreateCommand createJpqlQueryCommand(ProductQueryParam queryParam);
}
