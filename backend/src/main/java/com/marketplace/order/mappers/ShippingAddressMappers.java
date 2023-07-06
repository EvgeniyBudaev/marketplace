package com.marketplace.order.mappers;

import com.marketplace.order.dto.response.ShippingAddressResponseDto;
import com.marketplace.order.models.ShippingAddress;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShippingAddressMappers {

    ShippingAddressResponseDto entityToDto(ShippingAddress shippingAddress);
}
