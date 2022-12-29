package com.marketplace.backend.service.utils.queryes.processors;

import java.util.HashMap;

public enum ESortDirection {
    ASC("asc"," ASC"),
    DESC("desc"," DESC");

    private final String  alias;

    public String getQuery() {
        return query;
    }

    private final String query;
    ESortDirection(String alias, String query){
        this.alias = alias;
        this.query = query;
    }
    private static final HashMap<String,ESortDirection> LOOKUP_MAP = new HashMap<>();
    static {
        for (ESortDirection direction: values()) {
            LOOKUP_MAP.put(direction.alias, direction);
        }
    }


    public static ESortDirection getByDirection(String direction){
        return LOOKUP_MAP.get(direction);
    }
}
