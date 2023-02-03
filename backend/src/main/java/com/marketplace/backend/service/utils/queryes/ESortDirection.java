package com.marketplace.backend.service.utils.queryes;

import java.util.HashMap;

public enum ESortDirection {
    ASC("asc"," ASC"),
    DESC("desc"," DESC");

    private final String  alias;

    public String getDirection() {
        return direction;
    }

    private final String direction;
    ESortDirection(String alias, String direction){
        this.alias = alias;
        this.direction = direction;
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
