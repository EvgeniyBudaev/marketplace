package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ProductQueryParamImpl implements ProductQueryParam {

    private Boolean onStock;
    private final Map<String, Integer> pageParam = new HashMap<>(2);
    private final Map<String, String> filtersParam = new HashMap<>();

    private final Map<ESortedFields, ESortDirection> sortedParam = new HashMap<>();

    @Override
    public MultiValueMap<String, String> getRawAttribute() {
        return rawAttribute;
    }

    private final MultiValueMap<String, String> rawAttribute;
    private final MultiValueMap<EAttributeType, Attribute> attributes = new LinkedMultiValueMap<>();

    public ProductQueryParamImpl(MultiValueMap<String, String> rawAttribute) {
        this.rawAttribute = rawAttribute;
        List<String> pageList = rawAttribute.remove("page");
        if (pageList == null || pageList.isEmpty()) {
            this.pageParam.put("page", 1);
        } else {
            int currentPage = Integer.parseInt(pageList.get(0));
            this.pageParam.put("page", Math.max(currentPage, 1));
        }
        List<String> pageSizeList = rawAttribute.remove("size");
        if (pageSizeList == null || pageSizeList.isEmpty()) {
            this.pageParam.put("size", 5);
        } else {
            int pageSize = Integer.parseInt(pageSizeList.get(0));
            this.pageParam.put("size", Math.max(pageSize, 5));
        }
        List<String> catalogList = rawAttribute.remove("catalog");
        if (catalogList == null || catalogList.isEmpty()) {
            throw new IllegalRequestParam("Не поддерживаемый запрос");
        } else {
            this.filtersParam.put("catalog", catalogList.get(0));
        }
        List<String> sortList = rawAttribute.remove("sort");
        if (!(sortList == null || sortList.isEmpty())) {
            for (String row : sortList) {
                String[] sortField = row.split("_");
                if (sortField.length != 2) {
                    continue;
                }
                sortedParam.put(ESortedFields.getByAlias(sortField[0])
                        , ESortDirection.getByDirection(sortField[1]));
            }
        }
        List<String> onStockList = rawAttribute.remove("onstock");
        if (!(onStockList == null || onStockList.isEmpty())) {
            this.onStock = Boolean.parseBoolean(onStockList.get(0));
        }

    }


    @Override
    public Integer getCurrentPage() {
        return this.pageParam.get("page");
    }

    @Override
    public Integer getPageSize() {
        return this.pageParam.get("size");
    }

    @Override
    public String getCatalogAlias() {
        return this.filtersParam.get("catalog");
    }

    @Override
    public Set<String> getAttributesAlias() {
        return rawAttribute.keySet();
    }

    @Override
    public Map<ESortedFields, ESortDirection> getSortedParam() {
        return sortedParam;
    }

    @Override
    public void setAttributes(List<Attribute> list) {
        List<Attribute> tempList;
        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        this.attributes.put(EAttributeType.SELECTABLE, tempList);

        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        this.attributes.put(EAttributeType.DOUBLE, tempList);

        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.BOOLEAN)).toList();
        this.attributes.put(EAttributeType.BOOLEAN, tempList);
    }

    @Override
    public List<Attribute> getAttribute(EAttributeType attributeType) {
        return attributes.get(attributeType);
    }

    @Override
    public Boolean getOnStock() {
        return onStock;
    }
}
