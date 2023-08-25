package com.marketplace.order.services;

import com.marketplace.order.dto.response.SimplePaymentVariantsResponseDto;
import com.marketplace.order.models.PaymentVariant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PaymentVariantService {
    PaymentVariant getVariantById(Long id);

    List<SimplePaymentVariantsResponseDto> getAll();
}
