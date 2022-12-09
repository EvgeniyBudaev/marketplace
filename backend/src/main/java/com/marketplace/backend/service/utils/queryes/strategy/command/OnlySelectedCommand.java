package com.marketplace.backend.service.utils.queryes.strategy.command;

import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.strategy.AbstractCommand;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateCommand;

import java.util.ArrayList;
import java.util.List;

public class OnlySelectedCommand extends AbstractCommand implements QueryCreateCommand {
    public OnlySelectedCommand(ProductQueryResolver resolver) {
        super(resolver);
    }

    @Override
    public String createQueryString() {
        /*id значений по атрибутам*/
        List<Long> selectableValuesId = new ArrayList<>();
        super.resolver.getAttributes().get(EAttributeType.SELECTABLE).forEach(x -> {
            /*По каждому атрибуту выбираем значения*/
            List<String> attrIds = resolver.getParameters().get(x.getAlias());
            /*Мэпим из string в long и добавляем в selectableValuesId*/
            attrIds.forEach(s -> selectableValuesId.addAll(attrIds.stream().map(Long::parseLong).toList()));
        });
        super.getQueryParameters().put("listId",selectableValuesId);
        super.getQueryParameters().put("alias",resolver.getCatalogAlias());
        return "from Product as p join p.selectableValues sv where sv.id in (:listId) and p.catalog.alias=:alias and p.enabled=true";
    }
}
