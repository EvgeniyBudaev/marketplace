package com.marketplace.auth.service;

import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.repository.UserRepository;
import com.marketplace.auth.validators.PhoneNumberValidator;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;


@Service
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public AppUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public Optional<AppUser> findByEmail(String email) {
        return userRepository.findByEmailAndEnabledTrue(email);
    }
    public Optional<AppUser> findByPhone(String phone) {
        return userRepository.findByPhoneAndEnabledTrue(phone);
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String emailOrPhone) throws UsernameNotFoundException {
        AppUser user;
        EmailValidator validator = new EmailValidator();
        PhoneNumberValidator phoneNumberValidator = new PhoneNumberValidator();
        if(validator.isValid(emailOrPhone,null)){
            user = findByEmail(emailOrPhone).orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not found", emailOrPhone)));
            return new User(user.getEmail(), user.getPassword(), user.getAuthorities());
        }
        if (phoneNumberValidator.isValid(emailOrPhone,null)){
            user = findByPhone(emailOrPhone).orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not found", emailOrPhone)));
            return new User(user.getEmail(), user.getPassword(), user.getAuthorities());
        }
        throw new UsernameNotFoundException("Не поддерживаемый тип данных "+emailOrPhone);
    }

}
