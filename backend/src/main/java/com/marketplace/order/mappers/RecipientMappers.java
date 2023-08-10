package com.marketplace.order.mappers;

import com.marketplace.order.dto.response.RecipientResponseDto;
import com.marketplace.order.models.Recipient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecipientMappers {
    @Mapping(target = "uuid", source = "session.uuid")
    RecipientResponseDto entityToDto(Recipient recipient);
}
