package com.marketplace.users.service;

import com.marketplace.users.dto.user.request.RegisterUserRequestDto;
import com.marketplace.users.events.RegistrationUserCompleteEvent;
import com.marketplace.users.model.AppRole;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.model.enums.ERole;
import com.marketplace.users.repository.UserRepository;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AppRoleService roleService;
    private final ApplicationEventMulticaster eventPublisher;
    private final UserVerificationTokenService tokenService;
    private final SessionIdService sessionIdService;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, AppRoleService roleService, ApplicationEventMulticaster eventPublisher, UserVerificationTokenService tokenService, SessionIdService sessionIdService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.eventPublisher = eventPublisher;
        this.tokenService = tokenService;
        this.sessionIdService = sessionIdService;
    }

    @Transactional
    public AppUser registerNewUser(RegisterUserRequestDto dto) {
        AppUser user = saveNewUser(dto);
        String reference = "http://localhost:3000/auth/activate/" + tokenService.generateToken(user);
        this.eventPublisher.multicastEvent(new RegistrationUserCompleteEvent(user, reference));
        return user;
    }


    public AppUser saveNewUser(RegisterUserRequestDto dto) {
        AppUser user = dto.convertToUser();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        List<AppRole> defaultRole = new ArrayList<>(1);
        defaultRole.add(roleService.getRoleByName(ERole.CUSTOMER));
        user.setRoles(defaultRole);
        user.setIsEmailVerified(false);
        user.setIsPhoneVerified(false);
        user.setEnabled(true);
        user.setSessionId(setNewSessionByNewUser(user));
        return saveUser(user);
    }

    public AppUser getUserByEmail(String email) {
        return userRepository
                .findByEmailAndEnabledTrue(email)
                .orElseThrow(() -> new UsernameNotFoundException("Не найден пользователь с email " + email));
    }
    @Transactional
    public void activateUserByEmail(String token) {
        AppUser user = tokenService.checkEmailToken(token);
        user.setIsEmailVerified(true);
        saveUser(user);
    }


    public AppUser saveUser(AppUser user) {
        user.setSessionId(setNewSessionByNewUser(user));
        userRepository.save(user);
        return user;
    }

    public AppUser findUserById(Long id){
        return userRepository
                .findByIdAndEnabledTrue(id)
                .orElseThrow(() -> new UsernameNotFoundException("Не найден пользователь с id " + id));
    }

    public SessionId setNewSessionByNewUser(AppUser user) {
        return sessionIdService.setNewSessionForNewUser(user);
    }
}
