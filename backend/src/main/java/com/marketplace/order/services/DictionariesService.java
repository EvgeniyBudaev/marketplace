package com.marketplace.order.services;

import com.marketplace.order.dto.response.PaymentVariantsResponseDto;
import com.marketplace.order.dto.response.StatusResponseDto;
import com.marketplace.order.models.OrderStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DictionariesService {
    OrderStatus getStartedStatus();

    OrderStatus getOrderStatus(Long statusId);

    List<PaymentVariantsResponseDto> getPaymentVariants();
    List<StatusResponseDto> getOrderStatus();
}
