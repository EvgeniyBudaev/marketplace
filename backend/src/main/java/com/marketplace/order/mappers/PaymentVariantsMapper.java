package com.marketplace.order.mappers;

import com.marketplace.order.dto.response.SimplePaymentVariantsResponseDto;
import com.marketplace.order.models.PaymentVariant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentVariantsMapper {

    SimplePaymentVariantsResponseDto entityToSimpleDto(PaymentVariant entity);
}
