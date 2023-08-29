package com.marketplace.users.service;

import com.marketplace.properties.model.convertes.TokenProperty;
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

    public String generateToken(AppUser user) {
        EmailVerifyToken token = new EmailVerifyToken();
        token.setToken(UUID.randomUUID().toString());
        token.setTokenType(ETokenType.EMAIL_TOKEN);
        token.setUser(user);
        token.setIsUsed(false);
        token.setExpired(LocalDateTime.now().plusNanos(property.getCredentialVerifyTokenProperty().getPeriod()));
        verificationTokenRepository.save(token);
        return token.getToken();
    }

    public AppUser checkEmailToken(String token, String email) {
        TypedQuery<EmailVerifyToken> query =
                entityManager.createQuery("SELECT t from " +
                        "EmailVerifyToken as t inner join fetch t.user as u where t.token=:token and t.tokenType=:tokenType and u.email=:email and t.isUsed=false ", EmailVerifyToken.class);
        query.setParameter("tokenType", ETokenType.EMAIL_TOKEN);
        query.setParameter("token", token);
        query.setParameter("email", email);
        EmailVerifyToken emailVerifyToken = query.getResultStream().findFirst().orElse(null);
        if (emailVerifyToken == null) {
           return null;
        }
        if (LocalDateTime.now().isAfter(emailVerifyToken.getExpired())) {
            return null;
        }
        emailVerifyToken.setIsUsed(true);
        return emailVerifyToken.getUser();
    }
}
