package com.marketplace.order.controllers;

import com.marketplace.order.dto.response.StatusResponseDto;
import com.marketplace.order.dto.response.PaymentVariantsResponseDto;
import com.marketplace.order.services.DictionariesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dictionaries")
public class DictionariesController {
    private final DictionariesService dictionariesService;

    @Autowired
    public DictionariesController(DictionariesService dictionariesService) {
        this.dictionariesService = dictionariesService;
    }

    @GetMapping("statusShipping")
    List<StatusResponseDto> getShippingStatuses(){
        return dictionariesService.getOrderStatus();
    }

    @GetMapping("paymentVariant")
    List<PaymentVariantsResponseDto> getPaymentVariants(){
        return dictionariesService.getPaymentVariants();
    }
}
