package com.marketplace.auth.service;

import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.validators.PhoneNumberValidator;
import com.marketplace.backend.exception.ResourceNotFoundException;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;



@Service
public class AppUserDetailsService implements UserDetailsService {
    private final EntityManager entityManager;

    public AppUserDetailsService( EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    public AppUser findUserWithRolesByEmail(String email) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("user-with-roles");
        TypedQuery<AppUser> query = entityManager
                .createQuery("SELECT u from AppUser as u where u.email=:email and u.enabled=true", AppUser.class);
        query.setParameter("email",email);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        AppUser user  = query.getSingleResult();
        if(user==null){
            throw new UsernameNotFoundException(String.format("User '%s' not found", email));
        }
        return user;
    }
    public AppUser findUserWithRolesByPhone(String phone) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("user-with-roles");
        TypedQuery<AppUser> query = entityManager
                .createQuery("SELECT u from AppUser as u where u.phone=:phone and u.enabled=true", AppUser.class);
        query.setParameter("phone",phone);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        AppUser user  = query.getSingleResult();
        if(user==null){
            throw new UsernameNotFoundException(String.format("User '%s' not found", phone));
        }
        return user;
    }

    public AppUser findUserByRefreshToken(String token){
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("user-with-roles");
        TypedQuery<AppUser> query = entityManager
                .createQuery("SELECT u from AppUser as u inner join RefreshToken as r where r.token=:token", AppUser.class);
        query.setParameter("token",token);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        AppUser user  = query.getSingleResult();
        if(user==null){
            throw new ResourceNotFoundException("Refresh not found");
        }
        return user;
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String emailOrPhone) throws UsernameNotFoundException {
        AppUser user;
        EmailValidator validator = new EmailValidator();
        PhoneNumberValidator phoneNumberValidator = new PhoneNumberValidator();
        if(validator.isValid(emailOrPhone,null)){
            user = findUserWithRolesByEmail(emailOrPhone);
            return new User(user.getEmail(), user.getPassword(), user.getAuthorities());
        }
        if (phoneNumberValidator.isValid(emailOrPhone,null)){
            user = findUserWithRolesByPhone(emailOrPhone);
            return new User(user.getEmail(), user.getPassword(), user.getAuthorities());
        }
        throw new UsernameNotFoundException("Не поддерживаемый тип данных "+emailOrPhone);
    }

}
