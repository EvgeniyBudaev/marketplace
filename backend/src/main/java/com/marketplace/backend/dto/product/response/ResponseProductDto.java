package com.marketplace.backend.dto.product.response;


import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
public class ResponseProductDto {
    private String catalogAlias;
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private String description;
    private Double rating;
    private String price;
    private String count;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<AttributeValueDto> attributes = new HashSet<>();

    @Data
    public static class AttributeValueDto{
       private String attributeName;
       private String value;
    }

    public ResponseProductDto(Product product, String catalogAlias){
        this.setCatalogAlias(catalogAlias);
        this.setId(product.getId());
        this.setName(product.getName());
        this.setAlias(product.getAlias());
        this.setEnabled(product.getEnabled());
        this.setPrice(product.getPrice().toString());
        this.setCount(String.valueOf(product.getCount()));
        this.setCreatedAt(product.getCreatedAt());
        this.setDescription(product.getDescription());
        this.setRating(product.getRating());
        this.getAttributes().addAll(convertDoubleValueToDto(product.getDoubleValues()));
        this.getAttributes().addAll(convertIntegerValueToDto(product.getBooleanValues()));
        this.getAttributes().addAll(convertSelectValueToDto(product.getSelectableValues()));
    }


    private Set<AttributeValueDto> convertDoubleValueToDto(Set<DoubleValue> list){
        Set<AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(DoubleValue doubleValue:list){
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(doubleValue.getValue().toString());
            valueDto.setAttributeName(doubleValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private Set<AttributeValueDto> convertIntegerValueToDto(Set<BooleanValue> list){
        Set<AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(BooleanValue booleanValue :list){
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(booleanValue.getValue().toString());
            valueDto.setAttributeName(booleanValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private Set<AttributeValueDto> convertSelectValueToDto(Set<SelectableValue> list){
        Set<AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(SelectableValue selectableValue :list){
            AttributeValueDto valueDto = new AttributeValueDto();
            valueDto.setValue(selectableValue.getValue());
            valueDto.setAttributeName(selectableValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
}
