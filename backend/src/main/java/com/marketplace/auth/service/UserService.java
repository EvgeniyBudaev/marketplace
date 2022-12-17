package com.marketplace.auth.service;

import com.marketplace.auth.dto.user.request.RegisterUserRequestDto;
import com.marketplace.auth.dto.user.response.UserAfterUpdateResponseDto;
import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAfterUpdateResponseDto saveOrUpdate(RegisterUserRequestDto dto){
        AppUser user = dto.convertToUser();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);
        return  new UserAfterUpdateResponseDto(user);
    }
}
