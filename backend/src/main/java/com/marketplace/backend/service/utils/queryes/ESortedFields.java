package com.marketplace.backend.service.utils.queryes;

import java.util.HashMap;

public enum ESortedFields {
    CREATED("created", "createdAt"),
    MODIFIED("modify", "modifyDate"),
    ALIAS("alias", "alias"),
    NAME("name", "name"),
    PRICE("price", "price");
    private final String alias;
    private final String field;

    ESortedFields(String alias, String field) {
        this.alias = alias;
        this.field = field;
    }

    private static final HashMap<String, ESortedFields> LOOKUP_MAP = new HashMap<>();

    static {
        for (ESortedFields value : values()) {
            LOOKUP_MAP.put(value.alias, value);
        }
    }

    public String getFiled() {
        return this.field;
    }

    public static ESortedFields getByAlias(String alias) {
        return LOOKUP_MAP.get(alias);
    }
}
