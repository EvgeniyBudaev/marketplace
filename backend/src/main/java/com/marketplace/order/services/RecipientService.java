package com.marketplace.order.services;

import com.marketplace.order.dto.request.RecipientSaveRequestDto;
import com.marketplace.order.models.Recipient;
import com.marketplace.users.service.SessionIdService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;

@Service
public class RecipientService {
    @PersistenceContext
    private final EntityManager entityManager;
    private final SessionIdService sessionIdService;

    public RecipientService(EntityManager entityManager, SessionIdService sessionIdService) {
        this.entityManager = entityManager;
        this.sessionIdService = sessionIdService;
    }

    @Transactional
    public Recipient getRecipientBySession(String uuid) {
        TypedQuery<Recipient> query = entityManager.createQuery("SELECT r FROM Recipient as r INNER JOIN r.session as s where s.uuid=:uuid", Recipient.class);
        query.setParameter("uuid",uuid);
        return query.getResultStream().findFirst().orElse(null);
    }
    @Transactional
    public Recipient saveRecipient(RecipientSaveRequestDto dto){
        Recipient recipient = getRecipientBySession(dto.getUuid());
        if(recipient==null){
           return saveNewRecipient(dto);
        }
        completeRecipient(dto, recipient);
        entityManager.merge(recipient);
        return recipient;
    }

    private Recipient saveNewRecipient(RecipientSaveRequestDto dto) {
        Recipient recipient = new Recipient();
        completeRecipient(dto, recipient);
        entityManager.persist(recipient);
        return recipient;
    }

    private void completeRecipient(RecipientSaveRequestDto dto, Recipient recipient) {
        recipient.setEmail(dto.getEmail());
        recipient.setName(dto.getName());
        recipient.setSurname(dto.getSurname());
        recipient.setPhone(dto.getPhone());
        recipient.setModifyDate(LocalDateTime.now());
        recipient.setPhone(dto.getPhone());
        recipient.setSession(sessionIdService.getSession(dto.getUuid()));
    }
}
