package com.marketplace.backend.model;

public enum EAttributeType {
    BOOLEAN,SELECTABLE,DOUBLE;
    public String getTableName(){
        String valueTable = null;
        switch (this){
            case DOUBLE -> valueTable= "DoubleValue";
            case SELECTABLE -> valueTable= "SelectableValue";
            case BOOLEAN -> valueTable = "BooleanValue";
        }
        return valueTable;
    }
}
