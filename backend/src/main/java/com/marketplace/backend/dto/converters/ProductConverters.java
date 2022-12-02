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
        responseDto.setDoubleValues(convertDoubleValueToDto(product.getDoubleValues()));
        responseDto.setIntegerValues(convertIntegerValueToDto(product.getIntegerValues()));
        responseDto.setStringValues(convertStringValueToDto(product.getStringValues()));
        responseDto.setDescription(product.getDescription());
        responseDto.setRating(product.getRating());
        return responseDto;
    }


    private List<ResponseProductDto.DoubleValueDto> convertDoubleValueToDto(List<DoubleValue> list){
        List<ResponseProductDto.DoubleValueDto> result = new ArrayList<>();
        if (list==null){
            return result;
        }
        for(DoubleValue doubleValue:list){
            ResponseProductDto.DoubleValueDto valueDto = new ResponseProductDto.DoubleValueDto();
            valueDto.setValue(doubleValue.getValue());
            valueDto.setAttributeName(doubleValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private List<ResponseProductDto.IntegerValueDto> convertIntegerValueToDto(List<IntegerValue> list){
        List<ResponseProductDto.IntegerValueDto> result = new ArrayList<>();
        if (list==null){
            return result;
        }
        for(IntegerValue integerValue:list){
            ResponseProductDto.IntegerValueDto valueDto = new ResponseProductDto.IntegerValueDto();
            valueDto.setValue(integerValue.getValue());
            valueDto.setAttributeName(integerValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
    private List<ResponseProductDto.StringValueDto> convertStringValueToDto(List<StringValue> list){
        List<ResponseProductDto.StringValueDto> result = new ArrayList<>();
        if (list==null){
            return result;
        }
        for(StringValue integerValue:list){
            ResponseProductDto.StringValueDto valueDto = new ResponseProductDto.StringValueDto();
            valueDto.setValue(integerValue.getValue());
            valueDto.setAttributeName(integerValue.getAttribute().getName());
            result.add(valueDto);
        }
        return result;
    }
}
