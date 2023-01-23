package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper
public interface ProductMapper {
    @Mapping(target = "price",source = "price",defaultValue ="0" )
    Product dtoToEntity(RequestSaveProductDto dto);

}
