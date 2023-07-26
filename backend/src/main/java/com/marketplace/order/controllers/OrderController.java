package com.marketplace.order.controllers;

import com.marketplace.backend.model.Paging;
import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.dto.response.OrderResponseDto;
import com.marketplace.order.models.Order;
import com.marketplace.order.services.OrderService;
import com.marketplace.properties.model.properties.GlobalProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    private final GlobalProperty globalProperty;

    @Autowired
    public OrderController(OrderService orderService, GlobalProperty globalProperty) {
        this.orderService = orderService;
        this.globalProperty = globalProperty;
    }

    @PostMapping("create")
    public boolean createOrder(@RequestBody @Valid CreateOrderRequestDto dto){
        return orderService.createOrder(dto);
    }
    @GetMapping("order/{id}")
    public OrderResponseDto getOrderById(@PathVariable Long id){
       Order order = orderService.getOrderById(id);
       return new OrderResponseDto(order,globalProperty.getPRODUCT_BASE_URL());
    }

    @GetMapping("all")
    public Paging<OrderResponseDto> getAllOrderByPageAndStatus(){
        return null;
    }
}
