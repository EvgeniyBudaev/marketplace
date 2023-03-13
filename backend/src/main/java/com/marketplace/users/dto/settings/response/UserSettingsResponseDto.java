package com.marketplace.users.dto.settings.response;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UserSettingsResponseDto {
    private String theme;
    private String currency;
    private String language;
    private String uuid;
}
