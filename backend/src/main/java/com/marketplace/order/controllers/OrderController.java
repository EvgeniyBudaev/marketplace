package com.marketplace.order.controllers;

import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("create")
    public boolean createOrder(@RequestBody @Valid CreateOrderRequestDto dto){
        return orderService.createOrder(dto);
    }
}
