package com.marketplace.order.services.impl;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Paging;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import com.marketplace.order.dto.request.CreateOrderRequestDto;
import com.marketplace.order.dto.request.PatchOrderRequestDto;
import com.marketplace.order.dto.response.OrderResponseDto;
import com.marketplace.order.dto.response.SimpleOrderResponseDto;
import com.marketplace.order.events.AppOrderEvent;
import com.marketplace.order.events.EOrderEvents;
import com.marketplace.order.events.OrderEvents;
import com.marketplace.order.events.impl.OrderEventsImpl;
import com.marketplace.order.mappers.OrderMappers;
import com.marketplace.order.models.*;
import com.marketplace.order.services.DictionariesService;
import com.marketplace.order.services.OrderQueryParam;
import com.marketplace.order.services.OrderQueryProcessor;
import com.marketplace.order.services.PaymentVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.lang.module.ResolutionException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderService {
    private final CartService cartService;
    private final RecipientService recipientService;
    private final ShippingAddressService shippingAddressService;
    private final DictionariesService dictionariesService;
    private final ApplicationEventMulticaster eventPublisher;
    private final PaymentVariantService paymentVariantService;
    private final OrderMappers orderMappers;
    @PersistenceContext
    private final EntityManager entityManager;


    @Autowired
    public OrderService(CartService cartService, RecipientService recipientService, ShippingAddressService shippingAddressService, DictionariesService dictionariesService, ApplicationEventMulticaster eventPublisher, PaymentVariantService paymentVariantService, OrderMappers orderMappers, EntityManager entityManager) {
        this.cartService = cartService;
        this.recipientService = recipientService;
        this.shippingAddressService = shippingAddressService;
        this.dictionariesService = dictionariesService;
        this.eventPublisher = eventPublisher;
        this.paymentVariantService = paymentVariantService;
        this.orderMappers = orderMappers;
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
        order.setPaymentVariant(this.paymentVariantService.getVariantById(dto.getPaymentVariantId()));
        order.setAmount("");
        order.setStatus(dictionariesService.getStartedStatus());
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
        amount.set(new BigDecimal("0"));
        cart.getItems().forEach(cartItem->{
            OrderItem orderItem = new OrderItem(cartItem,order);
            order.getOrderItems().add(orderItem);
            entityManager.persist(orderItem);
            amount.set(amount.get().add(orderItem.getAmount()));
        });
        order.setAmount(amount.get().toString());
        cartService.clearCart(cart);
        OrderEvents event = new OrderEventsImpl(order, EOrderEvents.ORDER_CREATE);
        this.eventPublisher.multicastEvent(new AppOrderEvent(event));
        return true;
    }
    @Transactional
    public Order getOrderById(Long id) {
        TypedQuery<Order> query = entityManager.createQuery("SELECT o FROM Order as o JOIN FETCH o.orderItems WHERE o.id=:id", Order.class);
        query.setParameter("id",id);
        return query.getResultStream().findFirst().orElseThrow(ResolutionException::new);
    }

    @Transactional
    public Paging<SimpleOrderResponseDto> getAllByPage(OrderQueryParam queryParam) {
        OrderQueryProcessor queryProcessor = new OrderQueryProcessorImpl(queryParam);
        TypedQuery<Long> countOrdersQuery = entityManager.createQuery(queryProcessor.getCountQuery(), Long.class);
        queryProcessor.setCountQueryParameters(countOrdersQuery);
        Integer count = Math.toIntExact(countOrdersQuery.getSingleResult());
        if (count.equals(0)) {
            return new Paging<>(0, queryParam.getPageSize(), 1);
        }
        Paging<SimpleOrderResponseDto> resultDto = new Paging<>(count,queryParam.getPageSize(), queryParam.getCurrentPage());
        TypedQuery<Order> orderQueryList = entityManager.createQuery(queryProcessor.getMainQuery(), Order.class);
        queryProcessor.setMainQueryParameters(orderQueryList);
        List<Order> orders = orderQueryList.getResultList();
        resultDto.setContent(orders.stream().map(SimpleOrderResponseDto::new).toList());
        return  resultDto;
    }

    @Transactional
    public OrderResponseDto patchOrder(PatchOrderRequestDto dto, String productBaseUrl) {
        TypedQuery<Order> query = entityManager.createQuery("SELECT o FROM Order as o where o.id=:id", Order.class);
        query.setParameter("id",dto.getId());
        Order oldOrder = query.getResultStream().findFirst().orElseThrow(()-> new ResourceNotFoundException("Не найден ордер с id: "+dto.getId()));
        entityManager.detach(oldOrder);
        Order order = orderMappers.orderDtoToEntity(dto);
        OrderStatus status = dictionariesService.getOrderStatus(dto.getStatus());
        if (status==null){
            throw new ResourceNotFoundException("Не найден статус ордера: "+dto.getStatus());
        }
        order.setPaymentVariant(this.paymentVariantService.getVariantById(dto.getPaymentVariantId()));
        order.setSessionId(oldOrder.getSessionId());
        order.setCreatedAt(oldOrder.getCreatedAt());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(status);
        order.setRecipientName(dto.getRecipient().getName()+" "+ dto.getRecipient().getSurname());
        Set<OrderItem> orderItems = order.getOrderItems();
        final long[] amount = new long[1];
        orderItems.forEach(x->{
            BigDecimal bgQuantity = new BigDecimal(x.getQuantity(),new MathContext(2, RoundingMode.HALF_UP));
            x.setAmount(x.getPrice().multiply(bgQuantity));
            x.setOrder(order);
            amount[0] = x.getAmount().longValue()+ amount[0];
        });
        order.setAmount(String.valueOf(amount[0]));
        entityManager.merge(order);
        return new OrderResponseDto(order,productBaseUrl);
    }
}
