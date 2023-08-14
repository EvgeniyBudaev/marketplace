package com.marketplace.order.services.impl;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Paging;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.dto.request.PatchOrderRequestDto;
import com.marketplace.order.dto.response.OrderResponseDto;
import com.marketplace.order.dto.response.SimpleOrderResponseDto;
import com.marketplace.order.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.lang.module.ResolutionException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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
        Cart cart = cartService.getFullCartByUUIDForNonAuthUser(dto.getUuid());
        Order order = new Order();
        order.setSessionId(cart.getSessionId());
        LocalDateTime createTime = LocalDateTime.now();
        order.setUpdatedAt(createTime);
        order.setCreatedAt(createTime);
        order.setPaymentVariant(dto.getPayment());
        order.setAmount("");
        order.setStatus(orderStatusService.getStartedStatus());
        ShippingAddress shippingAddress = shippingAddressService.getShippingAddressBySession(dto.getUuid());
        if(shippingAddress==null){
            throw new ResourceNotFoundException("Не найден адрес доставки");
        }
        order.setAddress(shippingAddress.getAddress());
        order.setFlat(shippingAddress.getFlat());
        order.setFloor(shippingAddress.getFloor());
        order.setComment(shippingAddress.getComment());
        Recipient recipient = recipientService.getRecipientBySession(dto.getUuid());
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
        cartService.clearCart(cart);
        return true;
    }
    @Transactional
    public Order getOrderById(Long id) {
        TypedQuery<Order> query = entityManager.createQuery("SELECT o FROM Order as o JOIN FETCH o.orderItems WHERE o.id=:id", Order.class);
        query.setParameter("id",id);
        return query.getResultStream().findFirst().orElseThrow(ResolutionException::new);
    }

    @Transactional
    public Paging<SimpleOrderResponseDto> getAllByPage(Integer currentPage, Integer pageSize, List<String> statuses) {
        String queryCount;
        String queryList;
        if(statuses==null){
            queryCount = "SELECT count(o) FROM Order as o inner join o.status as os ";
            queryList = "SELECT o FROM Order as o  inner join fetch o.status as os";

        }else {
            queryCount = "SELECT count(o) FROM Order as o inner join o.status as os where os.status in (:statuses)";
            queryList = "SELECT o FROM Order as o  inner join fetch o.status as os where os.status in (:statuses)";
        }
        TypedQuery<Long> countOrdersQuery = entityManager.createQuery(queryCount, Long.class);
        if (statuses!=null){
            countOrdersQuery.setParameter("statuses",statuses);
        }
        Integer count = Math.toIntExact(countOrdersQuery.getSingleResult());
        if (count.equals(0)) {
            throw new ResourceNotFoundException("С данными параметрами результаты не найдены");
        }
        Paging<SimpleOrderResponseDto> resultDto = new Paging<>(count,pageSize,currentPage);
        TypedQuery<Order> orderQueryList = entityManager.createQuery(queryList, Order.class);
        if(statuses!=null){
            orderQueryList.setParameter("statuses",statuses);
        }
        orderQueryList.setFirstResult((currentPage - 1) * pageSize);
        orderQueryList.setMaxResults(pageSize);
        List<Order> orders = orderQueryList.getResultList();
        resultDto.setContent(orders.stream().map(SimpleOrderResponseDto::new).toList());
        return  resultDto;
    }

    public OrderResponseDto patchOrder(PatchOrderRequestDto dto) {
        return null;
    }
}
