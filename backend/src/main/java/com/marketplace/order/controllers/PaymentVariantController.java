package com.marketplace.order.controllers;

import com.marketplace.order.dto.response.SimplePaymentVariantsResponseDto;
import com.marketplace.order.services.PaymentVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payment-variants")
public class PaymentVariantController {
    private final PaymentVariantService paymentVariantService;

    @Autowired
    public PaymentVariantController(PaymentVariantService paymentVariantService) {
        this.paymentVariantService = paymentVariantService;
    }
    @GetMapping("all")
    public List<SimplePaymentVariantsResponseDto> getAllVariants(){
        return this.paymentVariantService.getAll();
    }
}
