package com.marketplace.users.dto.settings.request;

import com.marketplace.users.model.enums.ECurrency;
import com.marketplace.users.model.enums.ETheme;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UpdateSettingsRequestDto {
    @NotNull
    private ETheme theme;
    @NotNull
    private ECurrency currency;
    @NotNull
    private String language;
    private String uuid;
}
