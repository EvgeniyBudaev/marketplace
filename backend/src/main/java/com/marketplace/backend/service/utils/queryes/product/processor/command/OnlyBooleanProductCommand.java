package com.marketplace.backend.service.utils.queryes.product.processor.command;

import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.product.processor.AbstractProductCommand;

import java.util.ArrayList;
import java.util.List;


public class OnlyBooleanProductCommand extends AbstractProductCommand {
    public OnlyBooleanProductCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString() {
        List<Long> booleanValuesId = new ArrayList<>();
        super.getProductQueryParam().getAttribute(EAttributeType.BOOLEAN).forEach(x -> {
            /*По каждому атрибуту выбираем значения*/
            List<String> attrIds = getProductQueryParam().getRawAttribute().get(x.getAlias());
            /*Мэпим из string в long и добавляем в booleanValuesId*/
            attrIds.forEach(s -> booleanValuesId.addAll(attrIds.stream().map(Long::parseLong).toList()));
        });
        super.param().put("listId", booleanValuesId);
        super.param().put("alias", getProductQueryParam().getCatalogAlias());
        return "from Product as p join p.booleanValues bv where bv.id in (:listId) and p.catalog.alias=:alias and p.enabled=true";

    }
}
