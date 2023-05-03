package com.marketplace.users.dto.settings.request;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PatchSettingsByLanguageRequestDto {
    @NotNull
    private String language;
    private String uuid;
}
