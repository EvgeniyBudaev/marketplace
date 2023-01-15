package com.marketplace.users.dto.settings.response;

import com.marketplace.users.model.UserSettings;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UserSettingsResponseDto {
    private String theme;
    private String currency;
    private String language;
    private String uuid;

    public UserSettingsResponseDto(UserSettings userSettings,String uuid){
        this.theme = userSettings.getTheme().name();
        this.currency = userSettings.getCurrency().name();
        this.language = userSettings.getLanguage().name();
        this.uuid = uuid;
    }
}
