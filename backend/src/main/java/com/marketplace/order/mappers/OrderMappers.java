package com.marketplace.order.mappers;

import com.marketplace.order.dto.request.PatchOrderRequestDto;
import com.marketplace.order.models.Order;
import com.marketplace.order.models.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface OrderMappers {
    @Mapping(target = "address", source = "shippingAddress.address")
    @Mapping(target = "flat", source = "shippingAddress.flat")
    @Mapping(target = "floor", source = "shippingAddress.floor")
    @Mapping(target = "comment", source = "shippingAddress.comment")
    @Mapping(target = "recipientPhone", source = "recipient.phone")
    @Mapping(target = "recipientEmail", source = "recipient.email")
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "orderItems", source = "items")
    Order orderDtoToEntity(PatchOrderRequestDto dto);

    @Mapping(target = "productName", source = "name")
    OrderItem orderItemDtoToEntity(PatchOrderRequestDto.OrderItemDto dto);

}
