package com.marketplace.users.service;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.properties.model.convertes.TokenProperty;
import com.marketplace.users.exception.VerificationTokenExpiredException;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.model.EmailVerifyToken;
import com.marketplace.users.model.enums.ETokenType;
import com.marketplace.users.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class UserVerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;
    private final EntityManager entityManager;
    private final TokenProperty property;

    public UserVerificationTokenService(VerificationTokenRepository verificationTokenRepository, EntityManager entityManager) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.entityManager = entityManager;
        property = new TokenProperty();
    }

    public String generateToken(AppUser user){
        EmailVerifyToken token = new EmailVerifyToken();
        token.setToken(UUID.randomUUID().toString());
        token.setTokenType(ETokenType.EMAIL_TOKEN);
        token.setUser(user);
        token.setExpired(LocalDateTime.now().plusNanos(property.getCredentialVerifyTokenProperty().getPeriod()));
        verificationTokenRepository.save(token);
        return token.getToken();
    }

    public AppUser checkEmailToken(String token){
        TypedQuery<EmailVerifyToken> query =
                entityManager.createQuery("SELECT t from " +
                        "EmailVerifyToken as t where t.token=:token and t.tokenType=:tokenType", EmailVerifyToken.class);
        query.setParameter("tokenType",ETokenType.EMAIL_TOKEN);
        query.setParameter("token",token);
        EmailVerifyToken emailVerifyToken = query.getSingleResult();
        if(emailVerifyToken ==null){
            throw new ResourceNotFoundException("Токен не найден");
        }
        if (LocalDateTime.now().isAfter(emailVerifyToken.getExpired())){
            throw new VerificationTokenExpiredException("");
        }
        return emailVerifyToken.getUser();
    }
}
