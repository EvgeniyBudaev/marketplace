package com.marketplace.users.service;

import com.marketplace.cart.model.Cart;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class SessionIdService {
    private final SessionRepository sessionRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public SessionIdService(SessionRepository sessionRepository, EntityManager entityManager) {
        this.sessionRepository = sessionRepository;
        this.entityManager = entityManager;
    }

    private String generateUuid(){
        return UUID.randomUUID().toString();
    }

    public SessionId setNewSession(AppUser user, Cart cart, UserSettings settings){
        SessionId session = new SessionId();
        session.setUuid(this.generateUuid());
        session.setCart(cart);
        session.setUserSettings(settings);
        session.setUser(user);
        session.setUpdated(LocalDateTime.now());
        sessionRepository.save(session);
        return session;
    }

}
