package com.marketplace.order.services;

import com.marketplace.order.models.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Service
public class OrderStatusService {
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public OrderStatusService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public OrderStatus getStartedStatus(){
       TypedQuery<OrderStatus> query= entityManager.createQuery("SELECT s FROM OrderStatus as s where path='1'", OrderStatus.class);
       return query.getSingleResult();
    }
}
