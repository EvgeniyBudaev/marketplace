package com.marketplace.users.mappers;

import com.marketplace.users.dto.settings.request.UpdateSettingsRequestDto;
import com.marketplace.users.dto.settings.response.UserSettingsResponseDto;
import com.marketplace.users.model.UserSettings;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserSettingsMapper {

    @Mapping(target = "modifyDate", expression = "java(java.time.LocalDateTime.now())")
    UserSettings entityFromDto(UpdateSettingsRequestDto dto);

    @Mapping(target = "theme", expression = "java(settings.getTheme().name())")
    @Mapping(target = "currency", expression = "java(settings.getCurrency().name())")
    @Mapping(target = "language", expression = "java(settings.getLanguage().getName())")
    @Mapping(target = "uuid", expression = "java(settings.getSessionId().getUuid())")
    UserSettingsResponseDto entityToDto(UserSettings settings);
}
