package com.marketplace.users.service;

import com.marketplace.users.dto.settings.request.UpdateSettingsRequestDto;
import com.marketplace.users.dto.settings.request.UserSettingsRequestDto;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.model.enums.ECurrency;
import com.marketplace.users.model.enums.ELanguage;
import com.marketplace.users.model.enums.ETheme;
import com.marketplace.users.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserSettingsService {
    private final UserSettingsRepository userSettingsRepository;
    private final EntityManager entityManager;
    private final SessionIdService sessionIdService;

    @Autowired
    public UserSettingsService(UserSettingsRepository userSettingsRepository, EntityManager entityManager, SessionIdService sessionIdService) {
        this.userSettingsRepository = userSettingsRepository;
        this.entityManager = entityManager;
        this.sessionIdService = sessionIdService;
    }

    public UserSettings geSettings(Principal principal, UserSettingsRequestDto dto){
        if(dto.getUuid()==null){
            return getDefaultSettings(null);
        }
        if(principal==null){
            return getSettingsForNonAuthUser(dto.getUuid());
        }
        return getSettingsForAuthUser(principal.getName());
    }

    private UserSettings getSettingsForNonAuthUser(String uuid){
        if(uuid==null){
            return getDefaultSettings(null);
        }
        TypedQuery<UserSettings> query =
                entityManager.
                        createQuery("SELECT s FROM UserSettings as s where s.sessionId.uuid=:uuid", UserSettings.class);
        query.setParameter("uuid",uuid);
        Optional<UserSettings> optionalUserSettings = query.getResultStream().findFirst();
        if(optionalUserSettings.isEmpty()){
            return getDefaultSettings(uuid);
        }
        return optionalUserSettings.get();
    }
    private UserSettings getSettingsForAuthUser(String email){
        TypedQuery<UserSettings> query =
                entityManager.
                        createQuery("SELECT s FROM UserSettings as s where s.sessionId.user.email=:email", UserSettings.class);
        query.setParameter("email",email);
        Optional<UserSettings> optionalUserSettings = query.getResultStream().findFirst();
        if(optionalUserSettings.isEmpty()){
            return getDefaultSettings(sessionIdService.getSessionIdByUserEmail(email).getUuid());
        }
        return optionalUserSettings.get();
    }
    private UserSettings getDefaultSettings(String uuid){
        UserSettings settings = new UserSettings();
        settings.setCurrency(ECurrency.RUB);
        settings.setLanguage(ELanguage.RU);
        settings.setTheme(ETheme.LIGHT);
        SessionId sessionId = new SessionId();
        sessionId.setUuid(uuid);
        settings.setSessionId(sessionId);
        return settings;
    }

    public UserSettings updateSettings(Principal principal, UpdateSettingsRequestDto dto){
       if(principal!=null){
           return updateSettingsForAuthUser(principal.getName(),dto);
       }
       return updateSettingsForNonAuthUser(dto);
    }

    private UserSettings updateSettingsForAuthUser(String email, UpdateSettingsRequestDto dto){
        SessionId sessionId = sessionIdService.getSessionIdByUserEmail(email);
        UserSettings settings = entityFromDto(dto);
        settings.setSessionId(sessionId);
        userSettingsRepository.save(settings);
        sessionIdService.updateUserSettingsId(sessionId,settings);
        return settings;
    }

    private UserSettings updateSettingsForNonAuthUser(UpdateSettingsRequestDto dto){
        SessionId sessionId = sessionIdService.getSession(dto.getUuid());
        UserSettings settings = entityFromDto(dto);
        settings.setSessionId(sessionId);
        userSettingsRepository.save(settings);
        sessionIdService.updateUserSettingsId(sessionId,settings);
        return settings;
    }


    private UserSettings entityFromDto(UpdateSettingsRequestDto dto){
        UserSettings settings = new UserSettings();
        settings.setTheme(dto.getTheme());
        settings.setLanguage(dto.getLanguage());
        settings.setCurrency(dto.getCurrency());
        settings.setModifyDate(LocalDateTime.now());
        return settings;
    }
}
