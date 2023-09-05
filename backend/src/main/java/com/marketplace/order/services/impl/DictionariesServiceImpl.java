package com.marketplace.order.services.impl;

import com.marketplace.order.dto.response.PaymentVariantsResponseDto;
import com.marketplace.order.dto.response.StatusResponseDto;
import com.marketplace.order.models.OrderStatus;
import com.marketplace.order.models.PaymentVariant;
import com.marketplace.order.services.DictionariesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class DictionariesServiceImpl implements DictionariesService {
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public DictionariesServiceImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public OrderStatus getStartedStatus(){
        TypedQuery<OrderStatus> query= entityManager.createQuery("SELECT s FROM OrderStatus as s where path='1'", OrderStatus.class);
        return query.getSingleResult();
    }
    @Override
    public OrderStatus getOrderStatus(Long statusId) {
        if(statusId==null){
            return null;
        }
        TypedQuery<OrderStatus> query= entityManager.createQuery("SELECT s FROM OrderStatus as s where id=: status", OrderStatus.class);
        query.setParameter("status",statusId);
        return query.getResultStream().findFirst().orElse(null);
    }

    @Override
    public List<PaymentVariantsResponseDto> getPaymentVariants() {
        TypedQuery<PaymentVariant> query = entityManager
                .createQuery("SELECT pv FROM PaymentVariant as pv", PaymentVariant.class);
        return  query.getResultStream().map(PaymentVariantsResponseDto::new).toList();
    }

    @Override
    public List<StatusResponseDto> getOrderStatus() {
        TypedQuery<OrderStatus> query = entityManager
                .createQuery("SELECT o FROM OrderStatus as o", OrderStatus.class);

        return query.getResultStream().map(StatusResponseDto::new).toList();
    }
}
