package com.marketplace.order.services.impl;

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

    public OrderStatus getOrderStatus(String status) {
        if(status==null){
            return null;
        }
        TypedQuery<OrderStatus> query= entityManager.createQuery("SELECT s FROM OrderStatus as s where status=: status", OrderStatus.class);
        query.setParameter("status",status);
        return query.getResultStream().findFirst().orElse(null);
    }
}
