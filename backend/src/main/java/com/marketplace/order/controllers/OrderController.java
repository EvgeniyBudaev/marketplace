package com.marketplace.order.controllers;

import com.marketplace.backend.model.Paging;
import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.dto.request.PatchOrderRequestDto;
import com.marketplace.order.dto.response.CreateOrderResponseDto;
import com.marketplace.order.dto.response.OrderResponseDto;
import com.marketplace.order.dto.response.SimpleOrderResponseDto;
import com.marketplace.order.models.Order;
import com.marketplace.order.services.OrderQueryParam;
import com.marketplace.order.services.impl.OrderService;
import com.marketplace.order.services.OrderUrlResolver;
import com.marketplace.order.services.impl.OrderUrlResolverImpl;
import com.marketplace.properties.model.properties.GlobalProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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
    public CreateOrderResponseDto createOrder(@RequestBody @Valid CreateOrderRequestDto dto){
        CreateOrderResponseDto responseDto = new CreateOrderResponseDto();
        responseDto.setSuccess(orderService.createOrder(dto));
        return responseDto;
    }
    @GetMapping("order/{id}")
    public OrderResponseDto getOrderById(@PathVariable Long id){
       Order order = orderService.getOrderById(id);
       return new OrderResponseDto(order,globalProperty.getPRODUCT_BASE_URL());
    }

    @GetMapping("all")
    public Paging<SimpleOrderResponseDto> getAllOrderByPageAndStatus(HttpServletRequest request){
        OrderUrlResolver urlResolver = new OrderUrlResolverImpl();
        String rawQueryString = request.getQueryString();
        String queryString =null;
        if(rawQueryString!=null){
           queryString = URLDecoder.decode(rawQueryString, StandardCharsets.UTF_8);
        }
        OrderQueryParam queryParam = urlResolver.resolveQuery(queryString);
        return orderService.getAllByPage(queryParam.getCurrentPage(),queryParam.getPageSize(),queryParam.getStatuses());
    }

    @PatchMapping("order")
    public OrderResponseDto patchOrder(@RequestBody PatchOrderRequestDto dto){
        return orderService.patchOrder(dto);
    }
}
