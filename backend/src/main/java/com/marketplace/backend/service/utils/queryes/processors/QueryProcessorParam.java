package com.marketplace.backend.service.utils.queryes.processors;

import java.util.Map;

public interface QueryProcessorParam {
    String query();
    Map<String, Object> param();
}
