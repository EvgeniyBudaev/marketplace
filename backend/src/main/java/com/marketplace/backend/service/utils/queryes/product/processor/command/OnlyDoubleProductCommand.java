package com.marketplace.backend.service.utils.queryes.product.processor.command;

import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.product.processor.AbstractProductCommand;

import java.util.ArrayList;
import java.util.List;


public class OnlyDoubleProductCommand extends AbstractProductCommand {
    public OnlyDoubleProductCommand(ProductQueryParam queryParam) {
        super(queryParam);
    }

    @Override
    protected String createSubQueryString() {
        /*id значений по атрибутам*/
        List<Long> doubleValuesId = new ArrayList<>();
        super.getProductQueryParam().getAttribute(EAttributeType.DOUBLE).forEach(x -> {
            /*По каждому атрибуту выбираем значения*/
            List<String> attrIds = getProductQueryParam().getRawAttribute().get(x.getAlias());
            /*Мэпим из string в long и добавляем в doubleValuesId*/
            attrIds.forEach(s -> doubleValuesId.addAll(attrIds.stream().map(Long::parseLong).toList()));
        });
        super.param().put("listId", doubleValuesId);
        super.param().put("alias", getProductQueryParam().getCatalogAlias());
        return "from Product as p join p.doubleValues dv where dv.id in (:listId) and p.catalog.alias=:alias and p.enabled=true";
    }


}
