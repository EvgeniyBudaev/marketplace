package com.marketplace.users.dto.settings.request;

import com.marketplace.users.model.enums.ELanguage;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PatchSettingsByLanguageRequestDto {
    @NotNull
    private ELanguage language;
    private String uuid;
}
