package com.marketplace.order.services.impl;


import com.marketplace.order.dto.request.ShippingAddressSaveRequestDto;
import com.marketplace.order.models.ShippingAddress;
import com.marketplace.users.service.SessionIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;

@Service
public class ShippingAddressService {
    @PersistenceContext
    private final EntityManager entityManager;
    private final SessionIdService sessionIdService;

    @Autowired
    public ShippingAddressService(EntityManager entityManager, SessionIdService sessionIdService) {
        this.entityManager = entityManager;
        this.sessionIdService = sessionIdService;
    }
    @Nullable
    @Transactional
    public ShippingAddress getShippingAddressBySession(String uuid){
        TypedQuery<ShippingAddress> query = entityManager.createQuery("SELECT sa FROM ShippingAddress as sa JOIN FETCH sa.sessionId as s where s.uuid=:uuid", ShippingAddress.class);
        query.setParameter("uuid",uuid);
        return query.getResultStream().findFirst().orElse(null);
    }


    @Transactional
    public ShippingAddress saveShippingAddress(ShippingAddressSaveRequestDto dto) {
        ShippingAddress shippingAddress = getShippingAddressBySession(dto.getUuid());
        if(shippingAddress==null){
            return saveNewShippingAddress(dto);
        }
        shippingAddress.setModifyDate(LocalDateTime.now());
        shippingAddress.setAddress(dto.getAddress());
        shippingAddress.setFlat(dto.getFlat());
        shippingAddress.setFloor(dto.getFloor());
        shippingAddress.setComment(dto.getComment());
        entityManager.merge(shippingAddress);
        return shippingAddress;
    }

    public ShippingAddress saveNewShippingAddress(ShippingAddressSaveRequestDto dto){
        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setAddress(dto.getAddress());
        shippingAddress.setFlat(dto.getFlat());
        shippingAddress.setFloor(dto.getFloor());
        shippingAddress.setComment(dto.getComment());
        shippingAddress.setModifyDate(LocalDateTime.now());
        shippingAddress.setSessionId(sessionIdService.getSession(dto.getUuid()));
        entityManager.persist(shippingAddress);
        return shippingAddress;
    }
}
