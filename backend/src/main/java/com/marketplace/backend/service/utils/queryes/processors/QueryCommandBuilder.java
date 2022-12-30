package com.marketplace.backend.service.utils.queryes.processors;

import com.marketplace.backend.service.utils.queryes.ProductQueryParam;

public interface QueryCommandBuilder {
    AbstractCommand createJpqlQueryCommand(ProductQueryParam queryParam);
}
