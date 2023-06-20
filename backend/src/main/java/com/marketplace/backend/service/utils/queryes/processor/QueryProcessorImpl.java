package com.marketplace.backend.service.utils.queryes.processor;

import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ESortDirection;
import com.marketplace.backend.service.utils.queryes.ESortedFields;
import com.marketplace.backend.service.utils.queryes.QueryParam;

import java.util.Map;

public class QueryProcessorImpl implements QueryProcessor {
    private final QueryParam param;
    private final String tableName;

    public QueryProcessorImpl(QueryParam param, Class<?> clazz) {
        this.param = param;
        if (Attribute.class.equals(clazz)) {
            this.tableName = "Attribute";
        } else if (Catalog.class.equals(clazz)) {
            this.tableName = "Catalog";
        } else if (Product.class.equals(clazz)) {
            this.tableName = "Product";
        } else {
            throw new OperationNotAllowedException("Неизвестная таблица");
        }
    }

    @Override
    public String getCountQuery() {

        StringBuilder queryString = new StringBuilder("select count (c) from ").append(this.tableName).append(" as c ");

        if (param.getSearchString() != null) {
            queryString.append(" where lower (c.name) like lower (:param) ");
        }
        return queryString.toString();
    }

    @Override
    public String getMainQuery() {
        StringBuilder queryString = new StringBuilder("select c from ").append(this.tableName).append(" as c ");
        Map<ESortedFields, ESortDirection> paramMap = param.getSortedParam();
        if (param.getSearchString() != null) {
            queryString.append("where lower (c.name) like lower (:param) ");
        }
        queryString.append("order by ");
        if (paramMap.isEmpty()) {
            return queryString.append("name asc").toString();
        }
        paramMap.forEach((x, y) -> {
            if (x == null) {
                x = ESortedFields.NAME;
            }
            if (y == null) {
                y = ESortDirection.ASC;
            }
            queryString.append(x.getFiled()).append(" ").append(y.getDirection()).append(",");
        });
        return queryString.substring(0, queryString.length() - 1);
    }
}
