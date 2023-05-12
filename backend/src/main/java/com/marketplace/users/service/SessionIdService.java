package com.marketplace.users.service;

import com.marketplace.cart.model.Cart;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.model.UserSettings;
import com.marketplace.users.repository.SessionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class SessionIdService {
    private final SessionRepository sessionRepository;
    @PersistenceContext
    private final EntityManager entityManager;
    private final TransactionTemplate transactionTemplate;
    private final AppUserDetailsService userDetailsService;

    @Autowired
    public SessionIdService(SessionRepository sessionRepository, EntityManager entityManager, TransactionTemplate transactionTemplate, AppUserDetailsService userDetailsService) {
        this.sessionRepository = sessionRepository;
        this.entityManager = entityManager;
        this.transactionTemplate = transactionTemplate;
        this.userDetailsService = userDetailsService;
    }

    private String generateUuid() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public SessionId setNewSession() {
        SessionId session = new SessionId();
        session.setUuid(this.generateUuid());
        session.setUpdated(LocalDateTime.now());
        sessionRepository.save(session);
        return session;
    }

    @Transactional
    public SessionId setNewSessionForNewUser(AppUser user) {
        SessionId session = new SessionId();
        session.setUuid(this.generateUuid());
        session.setUpdated(LocalDateTime.now());
        session.setUser(user);
        return session;
    }

    public SessionId getSession(String uuid) {
        if (uuid == null) {
            return setNewSession();
        }
        Optional<SessionId> sessionId = sessionRepository.getSessionIdByUuid(uuid);
        return sessionId.orElseGet(this::setNewSession);
    }

    public SessionId getSession(AppUser user) {
        SessionId sessionId;
        TypedQuery<SessionId> sessionIdTypedQuery =
                entityManager.createQuery("SELECT s from SessionId as s where s.user=:user", SessionId.class);
        sessionIdTypedQuery.setParameter("user", user);
        Optional<SessionId> sessionIdOptional = sessionIdTypedQuery.getResultStream().findFirst();
        if (sessionIdOptional.isEmpty()) {
            sessionId = setNewSessionForNewUser(user);
            log.error("Пользователь был без сессии. Пользователь: " + user.toString());
        } else {
            sessionId = sessionIdOptional.get();
        }
        return sessionId;
    }

    public void updateCartInSession(SessionId sessionId, Cart cart) {
        transactionTemplate.execute(transactionStatus -> {
            Query query = entityManager.
                    createQuery("UPDATE SessionId as s set s.cart=:cart where s.id=:id");
            query.setParameter("cart", cart);
            query.setParameter("id", sessionId.getId());
            query.executeUpdate();
            transactionStatus.flush();
            return null;
        });

    }

    public void updateCartInSession(String uuid, Cart cart) {
        SessionId sessionId = getSession(uuid);
        updateCartInSession(sessionId, cart);
        cart.setSessionId(sessionId);
    }

    /*В сессию авторизованного пользователя добавляем карту*/
    @Transactional
    public void updateCartAndUser(AppUser user, Cart cart) {
        Query queryUpdate = entityManager
                .createQuery("UPDATE SessionId as s set s.cart=:cart where s.user=:user");
        queryUpdate.setParameter("user", user);
        queryUpdate.setParameter("cart", cart);
        int countUpdate = queryUpdate.executeUpdate();
        if (countUpdate != 1) {
            log.error("Обновили " + countUpdate + " записей. Пользователь: " + user.toString() + " Корзина: " + cart.toString());
        }
    }

    @Transactional
    public void updateUserSettingsId(SessionId sessionId, UserSettings settings) {
        sessionId.setUserSettings(settings);
        sessionRepository.save(sessionId);
    }

    public SessionId getSessionIdByUserEmail(String email) {
        AppUser user = userDetailsService.findUserWithRolesByEmail(email);
        return getSession(user);
    }

    public AppUser getUserInfo(Principal principal) {
        if (principal == null) {
            return null;
        }
        return userDetailsService.findUserWithRolesByEmail(principal.getName());
    }

}
