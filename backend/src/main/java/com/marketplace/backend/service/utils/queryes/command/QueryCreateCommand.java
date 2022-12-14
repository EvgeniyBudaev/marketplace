package com.marketplace.backend.service.utils.queryes.command;

import java.util.Map;

public interface QueryCreateCommand {

    String createQueryString();
    Map<String, Object> getQueryParameters();
}
