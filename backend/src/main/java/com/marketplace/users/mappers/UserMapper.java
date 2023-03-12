package com.marketplace.users.mappers;


import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.model.AppUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserInfoResponseDto entityToUserInfoDto(AppUser appUser);
}
