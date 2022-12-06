package com.marketplace.backend.dto.product;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        responseDto.getAttributes().addAll(convertDoubleValueToDto(product.getDoubleValues()));
        responseDto.getAttributes().addAll(convertIntegerValueToDto(product.getBooleanValues()));
        responseDto.getAttributes().addAll(convertSelectValueToDto(product.getSelectableValues()));
        responseDto.setDescription(product.getDescription());
        responseDto.setRating(product.getRating());
        return responseDto;
    }


    private List<ResponseProductDto.AttributeValueDto> convertDoubleValueToDto(List<DoubleValue> list){
        List<ResponseProductDto.AttributeValueDto> result = new ArrayList<>();
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
    private List<ResponseProductDto.AttributeValueDto> convertIntegerValueToDto(List<BooleanValue> list){
        List<ResponseProductDto.AttributeValueDto> result = new ArrayList<>();
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
    private List<ResponseProductDto.AttributeValueDto> convertSelectValueToDto(List<SelectableValue> list){
        List<ResponseProductDto.AttributeValueDto> result = new ArrayList<>();
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
