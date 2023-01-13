package com.marketplace.users.service;

import com.marketplace.users.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {
    private final UserSettingsRepository userSettingsRepository;
    @Autowired
    public UserSettingsService(UserSettingsRepository userSettingsRepository) {
        this.userSettingsRepository = userSettingsRepository;
    }
}
