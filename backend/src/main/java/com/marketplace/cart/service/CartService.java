package com.marketplace.cart.service;


import com.marketplace.cart.exception.ProductCountException;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.model.CartItem;
import com.marketplace.cart.repository.CartRepository;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.service.SessionIdService;
import com.marketplace.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final EntityManager entityManager;

    private final UserService userService;
    private final CartItemService cartItemService;
    private final SessionIdService sessionIdService;

    @Autowired
    public CartService(CartRepository cartRepository, EntityManager entityManager, UserService userService, CartItemService cartItemService, SessionIdService sessionIdService) {
        this.cartRepository = cartRepository;
        this.entityManager = entityManager;
        this.userService = userService;
        this.cartItemService = cartItemService;
        this.sessionIdService = sessionIdService;
    }

    public Cart clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
        return cart;
    }

    public Cart merge(String currentCartUuid, String currentCartUuid1) {
        return null;
    }

    public Cart removeItemFromCart(Cart cart, String productAlias) {
        Set<CartItem> cartItems = cart.getItems();
        if (cartItems == null || cartItems.isEmpty()) {
            throw new ProductCountException("Невозможно удалить в пустой корзине");
        }
        CartItem cartItem = cartItemService.deleteByProductAlias(cartItems, productAlias);
        cartItems.remove(cartItem);
        return cart;
    }

    public Cart decrementQuantity(Cart cart, String productAlias) {
        Set<CartItem> cartItems = cart.getItems();
        if (cartItems == null || cartItems.isEmpty()) {
            throw new ProductCountException();
        }
        CartItem cartItem = cartItemService.decrementQuantity(cartItems, productAlias);
        if (cartItem.getQuantity().equals(0)) {
            cartItems.remove(cartItem);
        } else {
            cartItems.add(cartItem);
        }
        return cart;
    }

    public Cart incrementQuantity(Cart cart, String productAlias) {
        Set<CartItem> cartItems = cart.getItems();
        if (cartItems == null) {
            cartItems = new HashSet<>();
            cart.setItems(cartItems);
        }
        CartItem cartItem = cartItemService.incrementQuantity(cart, productAlias);
        cartItems.add(cartItem);
        return cart;
    }

    public Cart setQuantity(Cart cart, String productAlias, Integer newQuantity) {
        Set<CartItem> cartItems = cart.getItems();
        if (cartItems == null) {
            cartItems = new HashSet<>();
            cart.setItems(cartItems);
        }
        CartItem cartItem = cartItemService.setQuantity(cart, productAlias,newQuantity);
        cartItems.add(cartItem);
        return cart;
    }
    public Cart getCurrentCartForAuthUser(String email) {
        TypedQuery<Cart> cartTypedQuery =
                entityManager.createQuery("SELECT c FROM AppUser as u " +
                        "inner join SessionId  as s inner join Cart as c where u.email=:email", Cart.class);
        cartTypedQuery.setParameter("email", email);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("cart-with-items-and-full-product");
        cartTypedQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Cart> optionalCart = cartTypedQuery.getResultStream().findFirst();
        if (optionalCart.isPresent()) {
            return optionalCart.get();
        }
        Cart cart = emptyCart();
        AppUser user = userService.getUserByEmail(email);
        sessionIdService.updateCartId(user,cart);
        return cart;
    }

    public Cart getCurrentCartByUUIDForNonAuthUser(String uuid) {
        Cart cart;
        TypedQuery<Cart> cartTypedQuery =
                entityManager.createQuery("SELECT c FROM Cart as c where c.sessionId.uuid=:uuid", Cart.class);
        cartTypedQuery.setParameter("uuid", uuid);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("cart-with-items-and-full-product");
        cartTypedQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Cart> optionalCart = cartTypedQuery.getResultStream().findFirst();
        if (optionalCart.isPresent()) {
            Cart result = optionalCart.get();
            /*У не авторизованного пользователя сессия и корзина должна быть без User иначе
            * корзина принадлежит авторизованному пользователю*/
            if (result.getSessionId().getUser()!=null){
                throw new AccessDeniedException("Доступ запрещен");
            }
            return optionalCart.get();
        }
        /*Если корзины нет заводим новую*/
        cart = emptyCart();
        sessionIdService.updateCartId(uuid,cart);
        return cart;
    }



    private Cart emptyCart() {
        Cart cart = new Cart();
        cart.setCreatedAt(LocalDateTime.now());
        save(cart);
        return cart;
    }

    @Transactional
    public Cart save(Cart cart) {
        cart.setModifyDate(LocalDateTime.now());
        return cartRepository.save(cart);
    }



}
