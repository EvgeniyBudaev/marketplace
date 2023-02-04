package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;


@Mapper
public interface ProductMapper {
    @Mapping(target = "price",source = "price",defaultValue ="0" )
    @Mapping(target = "count",source = "count",defaultValue ="0" )
    Product dtoToEntity(RequestSaveProductDto dto);
    default Set<SelectableValue> map(Set<Long> value){
        return null;
    }
}
