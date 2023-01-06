package com.marketplace.cart.service;

import com.marketplace.cart.dto.response.CartResponseDto;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final EntityManager entityManager;

    @Autowired
    public CartService(CartRepository cartRepository, EntityManager entityManager) {
        this.cartRepository = cartRepository;
        this.entityManager = entityManager;
    }

    public CartResponseDto clearCart(String currentCartUuid) {
        return null;
    }

    public CartResponseDto merge(String currentCartUuid, String currentCartUuid1) {
        return null;
    }

    public CartResponseDto removeItemFromCart(String currentCartUuid, String productAlias) {
        return null;
    }

    public CartResponseDto decrementItem(String currentCartUuid, String productAlias) {
        return null;
    }

    public CartResponseDto addToCart(String currentCartUuid, String productAlias) {
        return null;
    }

    public CartResponseDto getCurrentCartByUUIDForAuthUser(String email) {
        TypedQuery<Cart> cartTypedQuery =
                entityManager.createQuery("SELECT c FROM Cart as c where c.uuid=:uuid", Cart.class);
        cartTypedQuery.setParameter("uuid",email);
        Cart cart = cartTypedQuery.getSingleResult();
        if (cart==null){
            return newEmptyCart(email);
        }
        Set<Long> products = cart.getItems()
                .stream().map(x->x.getProduct().getId()).collect(Collectors.toSet());
        return null;

    }

    public CartResponseDto getCurrentCartByUUIDForNonAuthUser(String uuid){
        return null;
    }

    @Transactional
    public CartResponseDto newEmptyCart(String uuid) {
        Cart cart = new Cart();
        if(uuid==null){
            cart.setUuid(UUID.randomUUID().toString());
        }else {
            cart.setUuid(uuid);
        }
        this.cartRepository.save(cart);
        CartResponseDto dto= new CartResponseDto();
        dto.setUuid(cart.getUuid());
        dto.setCartAmount("0");
        dto.setCreatedAt(cart.getCreatedAt());
        dto.setModifyDate(cart.getModifyDate());
        dto.setItems(Collections.EMPTY_SET);
        return dto;
    }
}
