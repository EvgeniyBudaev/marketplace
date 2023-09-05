package com.marketplace.backend.dto.product.response;

import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class ResponseProductDtoForAdmin {
    private Long id;
    private String name;
    private String alias;
    private String catalogAlias;
    private Boolean enabled;
    private String description;
    private Double rating;
    private String price;
    private String count;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<AttributeValueDto> attributeValuesSet;
    private List<String> images;
    private String defaultImage;

    @Data
    public static class AttributeValueDto {
        private Long id;
        private EAttributeType attributeType;
        private String attributeName;
        private String attributeAlias;
        private String value;
    }
    public ResponseProductDtoForAdmin(){

    }
    public ResponseProductDtoForAdmin(Product product, String catalogAlias, List<String> images, String defaultImage){
        this.setCatalogAlias(catalogAlias);
        this.setId(product.getId());
        this.setName(product.getName());
        this.setAlias(product.getAlias());
        this.setEnabled(product.getEnabled());
        this.setPrice(product.getPrice().toString());
        this.setCount(String.valueOf(product.getCount()));
        this.setCreatedAt(product.getCreatedAt());
        this.setModifyDate(product.getModifyDate());
        this.setDescription(product.getDescription());
        this.setRating(product.getRating());
        if (product.getSelectableValues().isEmpty() && product.getBooleanValues().isEmpty() && product.getDoubleValues().isEmpty()) {
            return;
        }
        this.attributeValuesSet = new HashSet<>();
        Set<AttributeValueDto> numValuesDto = convertDoubleValueToDto(product.getDoubleValues());
        if (numValuesDto != null) {
            this.getAttributeValuesSet().addAll(numValuesDto);
        }
        Set<AttributeValueDto> boolValueDto = convertBooleanValueToDto(product.getBooleanValues());
        if (boolValueDto != null) {
            this.getAttributeValuesSet().addAll(boolValueDto);
        }
        Set<AttributeValueDto> selValueDto = convertSelectValueToDto(product.getSelectableValues());
        if (selValueDto != null) {
            this.getAttributeValuesSet().addAll(selValueDto);
        }
        this.defaultImage = defaultImage;
        if(images!=null&&!images.isEmpty()){
            this.images=images;
        }else {
            this.images=null;
        }
    }
    private Set<AttributeValueDto> convertDoubleValueToDto(Set<DoubleValue> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        Set<AttributeValueDto> result = new HashSet<>();
        for (DoubleValue doubleValue : list) {
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(doubleValue.getValue().toString());
            valueDto.setAttributeName(doubleValue.getAttribute().getName());
            valueDto.setAttributeAlias(doubleValue.getAttribute().getAlias());
            result.add(valueDto);
        }
        return result;
    }

    private Set<AttributeValueDto> convertBooleanValueToDto(Set<BooleanValue> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        Set<AttributeValueDto> result = new HashSet<>();
        for (BooleanValue booleanValue : list) {
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(booleanValue.getValue().toString());
            valueDto.setAttributeName(booleanValue.getAttribute().getName());
            valueDto.setAttributeAlias(booleanValue.getAttribute().getAlias());
            result.add(valueDto);
        }
        return result;
    }

    private Set<AttributeValueDto> convertSelectValueToDto(Set<SelectableValue> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        Set<AttributeValueDto> result = new HashSet<>();

        for (SelectableValue selectableValue : list) {
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(selectableValue.getValue());
            valueDto.setAttributeName(selectableValue.getAttribute().getName());
            valueDto.setAttributeAlias(selectableValue.getAttribute().getAlias());
            result.add(valueDto);
        }
        return result;
    }
}
