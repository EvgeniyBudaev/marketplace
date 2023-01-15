package com.marketplace.users.controllers;

import com.marketplace.users.dto.settings.request.UpdateSettingsRequestDto;
import com.marketplace.users.dto.settings.request.UserSettingsRequestDto;
import com.marketplace.users.dto.settings.response.UserSettingsResponseDto;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/settings")
public class UserSettingsController {
    private final UserSettingsService userSettingsService;

    @Autowired
    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @PostMapping
    public UserSettingsResponseDto getSettingsBySession(Principal principal,
                                                        @RequestBody UserSettingsRequestDto dto){
        UserSettings userSettings = userSettingsService.geSettings(principal, dto);
        return new UserSettingsResponseDto(userSettings,userSettings.getSessionId().getUuid());
    }

    @PostMapping("/update")
    private UserSettingsResponseDto updateSettings(Principal principal,
                                                   @Valid @RequestBody UpdateSettingsRequestDto dto){
        UserSettings userSettings = userSettingsService.updateSettings(principal, dto);
        return new UserSettingsResponseDto(userSettings,userSettings.getSessionId().getUuid());

    }


}
