package com.marketplace.users.controllers;

import com.marketplace.users.dto.settings.request.PatchSettingsByThemeRequestDto;
import com.marketplace.users.dto.settings.request.UpdateSettingsRequestDto;
import com.marketplace.users.dto.settings.request.UserSettingsRequestDto;
import com.marketplace.users.dto.settings.response.UserSettingsResponseDto;
import com.marketplace.users.mappers.UserSettingsMapper;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/settings")
public class UserSettingsController {
    private final UserSettingsService userSettingsService;
    private final UserSettingsMapper userSettingsMapper;

    @Autowired
    public UserSettingsController(UserSettingsService userSettingsService, UserSettingsMapper userSettingsMapper) {
        this.userSettingsService = userSettingsService;
        this.userSettingsMapper = userSettingsMapper;
    }

    @PostMapping
    public UserSettingsResponseDto getSettingsBySession(Principal principal,
                                                        @RequestBody UserSettingsRequestDto dto){
        UserSettings userSettings = userSettingsService.getSettings(principal, dto.getUuid());
        return userSettingsMapper.entityToDto(userSettings);
    }

    @PostMapping("/update")
    private UserSettingsResponseDto updateSettings(Principal principal,
                                                   @Valid @RequestBody UpdateSettingsRequestDto dto){
        UserSettings userSettings = userSettingsService.updateSettings(principal, dto);
        return userSettingsMapper.entityToDto(userSettings);

    }

    @PatchMapping("/patch/theme")
    private UserSettingsResponseDto patchSettingsByTheme(Principal principal, @Valid @RequestBody PatchSettingsByThemeRequestDto dto){
        UserSettings userSettings = userSettingsService.patchTheme(principal,dto);
        return userSettingsMapper.entityToDto(userSettings);
    }


}
