package com.marketplace.users.dto.settings.request;

import com.marketplace.users.model.enums.ETheme;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PatchSettingsByThemeRequestDto {
    @NotNull
    private ETheme theme;
    private String uuid;
}
