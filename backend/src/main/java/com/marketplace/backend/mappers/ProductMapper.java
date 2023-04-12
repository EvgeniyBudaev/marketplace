package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.product.request.RequestSaveOrUpdate;
import com.marketplace.backend.dto.product.response.ResponseProductDtoForAdmin;
import com.marketplace.backend.dto.product.response.ResponseProductGetAllDto;
import com.marketplace.backend.dto.product.response.ResponseProductSimpleDto;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;


@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "price", source = "price", defaultValue = "0")
    @Mapping(target = "count", source = "count", defaultValue = "0")
    Product dtoToEntity(RequestSaveOrUpdate dto);

    List<ResponseProductSimpleDto> entitiesToListDto(List<Product> entities);

    List<ResponseProductGetAllDto> entitiesToListGetAllDto(List<Product> entities);

    default Set<SelectableValue> map(Set<Long> value) {
        return null;
    }

    @Mapping(target = "catalogAlias", source = "catalog.alias")
    ResponseProductDtoForAdmin entityToDtoForAdmin(Product product);

    Set<ResponseProductDtoForAdmin.AttributeValueDto>
    selValuesToDtoForAdmin(Set<SelectableValue> selValue);

    @Mapping(target = "attributeType", source = "attribute.type")
    @Mapping(target = "attributeName", source = "attribute.name")
    @Mapping(target = "attributeAlias", source = "attribute.alias")
    ResponseProductDtoForAdmin.AttributeValueDto
    selValueToDtoForAdmin(SelectableValue selValue);

    Set<ResponseProductDtoForAdmin.AttributeValueDto>
    numValuesToDtoForAdmin(Set<DoubleValue> numValue);

    @Mapping(target = "attributeType", source = "attribute.type")
    @Mapping(target = "attributeName", source = "attribute.name")
    @Mapping(target = "attributeAlias", source = "attribute.alias")
    ResponseProductDtoForAdmin.AttributeValueDto
    numValuesToDtoForAdmin(DoubleValue numValue);


}
