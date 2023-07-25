package com.marketplace.order.services;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderService {
    private final CartService cartService;
    private final RecipientService recipientService;
    private final ShippingAddressService shippingAddressService;
    private final OrderStatusService orderStatusService;
    @PersistenceContext
    private final EntityManager entityManager;


    @Autowired
    public OrderService(CartService cartService, RecipientService recipientService, ShippingAddressService shippingAddressService, OrderStatusService orderStatusService, EntityManager entityManager) {
        this.cartService = cartService;
        this.recipientService = recipientService;
        this.shippingAddressService = shippingAddressService;
        this.orderStatusService = orderStatusService;
        this.entityManager = entityManager;
    }

    @Transactional
    public boolean createOrder(CreateOrderRequestDto dto) {
        Cart cart = cartService.getFullCartByUUIDForNonAuthUser(dto.getSession());
        Order order = new Order();
        order.setSessionId(cart.getSessionId());
        order.setUpdatedAt(LocalDateTime.now());
        order.setPaymentVariant(dto.getPayment());
        ShippingAddress shippingAddress = shippingAddressService.getShippingAddressBySession(dto.getSession());
        if(shippingAddress==null){
            throw new ResourceNotFoundException("Не найден адрес доставки");
        }
        String address = shippingAddress.getAddress()+" этаж: "+ shippingAddress.getFloor()+" квартира: "+ shippingAddress.getFlat();
        order.setShippingAddress(address);
        order.setComment(shippingAddress.getComment());
        Recipient recipient = recipientService.getRecipientBySession(dto.getSession());
        order.setRecipientPhone(recipient.getPhone());
        order.setRecipientEmail(recipient.getEmail());
        order.setRecipientName(recipient.getName()+" "+ recipient.getSurname());
        entityManager.persist(order);
        order.setOrderItems(new HashSet<>(cart.getItems().hashCode()));
        AtomicReference<BigDecimal> amount = new AtomicReference<>();
        cart.getItems().forEach(cartItem->{
            OrderItem orderItem = new OrderItem(cartItem,order);
            order.getOrderItems().add(orderItem);
            entityManager.persist(orderItem);
            amount.set(BigDecimal.valueOf(cartItem.getQuantity() * cartItem.getProduct().getPrice().longValue()));
        });
        order.setAmount(amount.get().toString());
        order.setStatus(orderStatusService.getStartedStatus());
        return true;
    }
}
