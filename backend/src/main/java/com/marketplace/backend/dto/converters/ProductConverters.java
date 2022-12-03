package com.marketplace.backend.dto.converters;

import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.dto.response.product.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.IntegerValue;
import com.marketplace.backend.model.values.StringValue;
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
        responseDto.getAttributes().addAll(convertDoubleValueToDto(product.getDoubleValues()));
        responseDto.getAttributes().addAll(convertIntegerValueToDto(product.getIntegerValues()));
        responseDto.getAttributes().addAll(convertStringValueToDto(product.getStringValues()));
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
    private List<ResponseProductDto.AttributeValueDto> convertIntegerValueToDto(List<IntegerValue> list){
        List<ResponseProductDto.AttributeValueDto> result = new ArrayList<>();
        if (list==null){
            return result;
        }
        for(IntegerValue integerValue:list){
            ResponseProductDto.AttributeValueDto valueDto = new ResponseProductDto.AttributeValueDto();
            valueDto.setValue(integerValue.getValue().toString());
            valueDto.setAttributeName(integerValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private List<ResponseProductDto.AttributeValueDto> convertStringValueToDto(List<StringValue> list){
        List<ResponseProductDto.AttributeValueDto> result = new ArrayList<>();
        if (list==null){
            return result;
        }
        for(StringValue integerValue:list){
            ResponseProductDto.AttributeValueDto valueDto = new ResponseProductDto.AttributeValueDto();
            valueDto.setValue(integerValue.getValue());
            valueDto.setAttributeName(integerValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
}
