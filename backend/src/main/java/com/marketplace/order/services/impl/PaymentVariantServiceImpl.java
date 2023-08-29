package com.marketplace.order.services.impl;

import com.marketplace.order.dto.response.SimplePaymentVariantsResponseDto;
import com.marketplace.order.mappers.PaymentVariantsMapper;
import com.marketplace.order.models.PaymentVariant;
import com.marketplace.order.services.PaymentVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class PaymentVariantServiceImpl implements PaymentVariantService {
    private final PaymentVariantsMapper paymentVariantsMapper;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public PaymentVariantServiceImpl(PaymentVariantsMapper paymentVariantsMapper, EntityManager entityManager) {
        this.paymentVariantsMapper = paymentVariantsMapper;
        this.entityManager = entityManager;
    }

    @Override
    public PaymentVariant getVariantById(Long id) {
        TypedQuery<PaymentVariant> query = entityManager.createQuery("SELECT pv FROM PaymentVariant as pv WHERE pv.id=:id", PaymentVariant.class);
        query.setParameter("id",id);
        return query.getResultStream().findFirst().orElse(null);
    }

    @Override
    public List<SimplePaymentVariantsResponseDto> getAll() {
        TypedQuery<PaymentVariant> query = entityManager.createQuery("SELECT pv FROM PaymentVariant as pv", PaymentVariant.class);
        return query.getResultStream().map(paymentVariantsMapper::entityToSimpleDto).toList();
    }
}
