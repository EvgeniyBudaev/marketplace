package com.marketplace.users.service;


import com.marketplace.users.model.AppUser;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

@Service
public class RefreshTokenService {
    private final EntityManager entityManager;

    public RefreshTokenService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public void updateToken(String email, String token) {
        Query query = entityManager.createNativeQuery("INSERT INTO refresh(id, token) " +
                "VALUES ((SELECT u.id from users as u where email=:email),:token) " +
                "ON DUPLICATE KEY UPDATE refresh.token=:token");
        query.setParameter("email", email);
        query.setParameter("token", token);
        query.executeUpdate();
    }

    public AppUser getUserByRefreshToken(String refreshToken) {
        TypedQuery<AppUser> query =
                entityManager.createQuery("SELECT tok.user from RefreshToken as tok where tok.token=:token", AppUser.class);
        query.setParameter("token", refreshToken);
        return query.getResultStream()
                .findFirst()
                .orElseThrow(() -> new AccessDeniedException("Пользователь не найден"));
    }

}
