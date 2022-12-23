package com.marketplace.auth.service;

import com.marketplace.auth.dto.user.request.RegisterUserRequestDto;
import com.marketplace.auth.dto.user.response.UserAfterUpdateResponseDto;
import com.marketplace.auth.model.AppRole;
import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.model.ERole;
import com.marketplace.auth.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AppRoleService roleService;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, AppRoleService roleService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }

    public UserAfterUpdateResponseDto saveNewUser(RegisterUserRequestDto dto){
        AppUser user = dto.convertToUser();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        List<AppRole> defaultRole = new ArrayList<>(1);
        defaultRole.add(roleService.getRoleByName(ERole.CUSTOMER));
        user.setRoles(defaultRole);
        user.setIsEmailVerified(false);
        user.setIsPhoneVerified(false);
        userRepository.save(user);
        return  new UserAfterUpdateResponseDto(user);
    }
}
