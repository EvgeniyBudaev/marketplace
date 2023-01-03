package com.marketplace.users.service;

import com.marketplace.users.dto.user.request.RegisterUserRequestDto;
import com.marketplace.users.dto.user.response.UserAfterUpdateResponseDto;
import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.events.RegistrationUserCompleteEvent;
import com.marketplace.users.model.AppRole;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.model.ERole;
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


    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, AppRoleService roleService, ApplicationEventMulticaster eventPublisher) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.eventPublisher = eventPublisher;
    }

    public UserAfterUpdateResponseDto registerNewUser(RegisterUserRequestDto dto){
        AppUser user = saveNewUser(dto);
        this.eventPublisher.multicastEvent(new RegistrationUserCompleteEvent(user));
        return new UserAfterUpdateResponseDto(user);
    }
    @Transactional
    public AppUser saveNewUser(RegisterUserRequestDto dto){
        AppUser user = dto.convertToUser();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        List<AppRole> defaultRole = new ArrayList<>(1);
        defaultRole.add(roleService.getRoleByName(ERole.CUSTOMER));
        user.setRoles(defaultRole);
        user.setIsEmailVerified(false);
        user.setIsPhoneVerified(false);
        userRepository.save(user);
        return  user;
    }

    public UserInfoResponseDto getUserInfo(String email){
        AppUser user = userRepository
                .findByEmailAndEnabledTrue(email)
                .orElseThrow(()->new UsernameNotFoundException("Не найден пользователь с email "+email));
        return  new UserInfoResponseDto(user);
    }
}
