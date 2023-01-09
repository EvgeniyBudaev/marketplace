package com.marketplace.cart.service;


import com.marketplace.backend.dao.ProductDao;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.model.CartItem;
import com.marketplace.cart.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Optional;
import java.util.Set;


@Service
public class CartItemService {
    private final EntityManager entityManager;
    private final CartItemRepository cartItemRepository;
    private final ProductDao productDao;

    public CartItemService(EntityManager entityManager, CartItemRepository cartItemRepository, ProductDao productDao) {
        this.entityManager = entityManager;
        this.cartItemRepository = cartItemRepository;
        this.productDao = productDao;
    }

    public CartItem addQuantity(Cart cart, String productAlias){
        Set<CartItem> cartItems = cart.getItems();
        CartItem cartItem;
        Optional<CartItem> cartItemOptional = cartItems.stream().filter(x->x.getProduct().getAlias().equals(productAlias)).findFirst();
        if(cartItemOptional.isPresent()){
            cartItem = cartItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity()+1);

        }else {
            cartItem = new CartItem();
            cartItem.setQuantity(1);
            cartItem.setCart(cart);
            cartItem.setProduct(productDao.findProductByAlias(productAlias));
        }
        save(cartItem);
        return cartItem;
    }

    @Transactional
    public CartItem save(CartItem cartItem){
        return cartItemRepository.save(cartItem);
    }
}
