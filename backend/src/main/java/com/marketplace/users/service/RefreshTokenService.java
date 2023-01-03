package com.marketplace.users.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;

@Service
public class RefreshTokenService {
    private final EntityManager entityManager;

    public RefreshTokenService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public void updateToken(String email, String token){
        Query query = entityManager.createNativeQuery("INSERT INTO refresh(id, token) " +
                "VALUES ((SELECT u.id from users as u where email=:email),:token) " +
                "ON DUPLICATE KEY UPDATE refresh.token=:token");
        query.setParameter("email",email);
        query.setParameter("token",token);
       query.executeUpdate();
    }

}
