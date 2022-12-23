package com.marketplace.backend.dto.product;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ProductConverters {

    public Product requestSaveProductDtoToProduct(RequestSaveProductDto dto, Catalog catalog){
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setAlias(dto.getAlias());
        product.setEnabled(dto.getEnabled());
        product.setCatalog(catalog);
        product.setDescription(dto.getDescription());
        return product;
    }

    public ResponseProductDto convertProductToResponseProductDto(Product product,String catalogAlias){
        ResponseProductDto responseDto = new ResponseProductDto();
        responseDto.setCatalogAlias(catalogAlias);
        responseDto.setId(product.getId());
        responseDto.setName(product.getName());
        responseDto.setAlias(product.getAlias());
        responseDto.setEnabled(product.getEnabled());
        responseDto.setPrice(product.getPrice());
        responseDto.setCount(String.valueOf(product.getCount()));
        responseDto.setCreatedAt(product.getCreatedAt());
        responseDto.setDescription(product.getDescription());
        responseDto.setRating(product.getRating());
        responseDto.getAttributes().addAll(convertDoubleValueToDto(product.getDoubleValues()));
        responseDto.getAttributes().addAll(convertIntegerValueToDto(product.getBooleanValues()));
        responseDto.getAttributes().addAll(convertSelectValueToDto(product.getSelectableValues()));
        return responseDto;
    }


    private Set<ResponseProductDto.AttributeValueDto> convertDoubleValueToDto(Set<DoubleValue> list){
        Set<ResponseProductDto.AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(DoubleValue doubleValue:list){
            ResponseProductDto.AttributeValueDto valueDto = new ResponseProductDto.AttributeValueDto();
            valueDto.setValue(doubleValue.getValue().toString());
            valueDto.setAttributeName(doubleValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private Set<ResponseProductDto.AttributeValueDto> convertIntegerValueToDto(Set<BooleanValue> list){
        Set<ResponseProductDto.AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(BooleanValue booleanValue :list){
            ResponseProductDto.AttributeValueDto valueDto = new ResponseProductDto.AttributeValueDto();
            valueDto.setValue(booleanValue.getValue().toString());
            valueDto.setAttributeName(booleanValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private Set<ResponseProductDto.AttributeValueDto> convertSelectValueToDto(Set<SelectableValue> list){
        Set<ResponseProductDto.AttributeValueDto> result = new HashSet<>();
        if (list==null){
            return result;
        }
        for(SelectableValue selectableValue :list){
            ResponseProductDto.AttributeValueDto valueDto = new ResponseProductDto.AttributeValueDto();
            valueDto.setValue(selectableValue.getValue());
            valueDto.setAttributeName(selectableValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
}
