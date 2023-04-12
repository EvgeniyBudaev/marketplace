package com.marketplace.users.mappers;


import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.model.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "uuid", source = "appUser.sessionId.uuid")
    UserInfoResponseDto entityToUserInfoDto(AppUser appUser);
}
