package com.marketplace.users.service;

import com.marketplace.users.dto.settings.request.PatchSettingsByThemeRequestDto;
import com.marketplace.users.dto.settings.request.UpdateSettingsRequestDto;
import com.marketplace.users.mappers.UserSettingsMapper;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.model.enums.ECurrency;
import com.marketplace.users.model.enums.ELanguage;
import com.marketplace.users.model.enums.ETheme;
import com.marketplace.users.repository.UserSettingsRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserSettingsService {
    private final UserSettingsRepository userSettingsRepository;
    private final EntityManager entityManager;
    private final SessionIdService sessionIdService;

    private final UserSettingsMapper userSettingsMapper;

    @Autowired
    public UserSettingsService(UserSettingsRepository userSettingsRepository, EntityManager entityManager, SessionIdService sessionIdService, UserSettingsMapper userSettingsMapper) {
        this.userSettingsRepository = userSettingsRepository;
        this.entityManager = entityManager;
        this.sessionIdService = sessionIdService;
        this.userSettingsMapper = userSettingsMapper;
    }

    public UserSettings getSettings(Principal principal, String uuid){
        if(uuid==null){
            return getDefaultSettings(null);
        }
        if(principal==null){
            return getSettingsForNonAuthUser(uuid);
        }
        return getSettingsForAuthUser(principal.getName());
    }
    @Transactional
    public UserSettings patchTheme(Principal principal,PatchSettingsByThemeRequestDto dto){
        UserSettings settings = getSettings(principal,dto.getUuid());
        settings.setTheme(dto.getTheme());
        Session session = (Session) entityManager;
        SessionId sessionId = sessionIdService.getSession(dto.getUuid());
        settings.setModifyDate(LocalDateTime.now());
        session.saveOrUpdate(settings);
        session.flush();
        sessionId.setUserSettings(settings);
        session.saveOrUpdate(sessionId);
        return settings;
    }

    private UserSettings getSettingsForNonAuthUser(String uuid){
        if(uuid==null){
            return getDefaultSettings(null);
        }
        TypedQuery<UserSettings> query =
                entityManager.
                        createQuery("SELECT s FROM UserSettings as s inner join SessionId as sid on s.id=sid.userSettings.id where sid.uuid=:uuid", UserSettings.class);
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
                        createQuery("SELECT s FROM SessionId as sid left join UserSettings as s where sid.user.email=:email", UserSettings.class);
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
        SessionId sessionId = sessionIdService.getSession(uuid);
        settings.setSessionId(sessionId);
        sessionId.setUserSettings(settings);
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
        UserSettings settings = userSettingsMapper.entityFromDto(dto);
        sessionId.setUserSettings(settings);
        userSettingsRepository.save(settings);
        sessionIdService.updateUserSettingsId(sessionId,settings);
        return settings;
    }

    private UserSettings updateSettingsForNonAuthUser(UpdateSettingsRequestDto dto){
        SessionId sessionId = sessionIdService.getSession(dto.getUuid());
        UserSettings settings = userSettingsMapper.entityFromDto(dto);
        sessionId.setUserSettings(settings);
        userSettingsRepository.save(settings);
        sessionIdService.updateUserSettingsId(sessionId,settings);
        settings.setSessionId(sessionId);
        return settings;
    }





}
