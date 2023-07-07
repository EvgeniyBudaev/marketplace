package com.marketplace.order.mappers;

import com.marketplace.order.dto.response.RecipientResponseDto;
import com.marketplace.order.models.Recipient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipientMappers {
    RecipientResponseDto entityToDto(Recipient recipient);
}
