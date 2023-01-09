package com.marketplace.cart.service;


import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.model.Product;
import com.marketplace.cart.exception.ProductCountException;
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
            Integer newQuantity = cartItem.getQuantity()+1;
            if(!checkNewQuantity(cartItem.getProduct(),newQuantity)){
                throw new ProductCountException();
            }
            cartItem.setQuantity(newQuantity);

        }else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(productDao.findProductByAlias(productAlias));
            if(!checkNewQuantity(cartItem.getProduct(),1)){
                throw new ProductCountException();
            }
            cartItem.setQuantity(1);
        }
        save(cartItem);
        return cartItem;
    }

       public CartItem decrementQuantity(Cart cart,String productAlias){
        Set<CartItem> cartItems = cart.getItems();
        CartItem cartItem;
        Optional<CartItem> cartItemOptional = cartItems.stream().filter(x->x.getProduct().getAlias().equals(productAlias)).findFirst();
        if(cartItemOptional.isPresent()){
            cartItem = cartItemOptional.get();
            Integer newQuantity = cartItem.getQuantity()-1;
            if(!checkNewQuantity(cartItem.getProduct(),newQuantity)){
                throw new ProductCountException();
            }
            cartItem.setQuantity(newQuantity);
            if (newQuantity.equals(0)){
                delete(cartItem);
                return cartItem;
            }

        }else {
            throw new ProductCountException();
        }
        save(cartItem);
        return cartItem;
    }


    @Transactional
    public CartItem save(CartItem cartItem){
        return cartItemRepository.save(cartItem);
    }

    private boolean checkNewQuantity(Product product, Integer newQuantity){
        if(newQuantity<0){
            return false;
        }
        return product.getCount()>=newQuantity;
    }

    public void delete(CartItem cartItem){
        cartItemRepository.delete(cartItem);
    }
}
