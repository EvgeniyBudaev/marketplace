package com.marketplace.auth.service;

import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.repository.UserRepository;
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

    public Optional<AppUser> findByUsername(String email) {
        return userRepository.findByEmailAndEnabledTrue(email);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = findByUsername(email).orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not found", email)));
        return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }

}
