package com.marketplace.cart.service;


import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.model.Product;
import com.marketplace.cart.exception.ProductCountException;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.model.CartItem;
import com.marketplace.cart.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;


@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final ProductDao productDao;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository, ProductDao productDao) {
        this.cartItemRepository = cartItemRepository;
        this.productDao = productDao;
    }


    public CartItem incrementQuantity(Cart cart, String productAlias) {
        Set<CartItem> cartItems = cart.getItems();
        CartItem cartItem = getCartItemByProductAlias(cartItems, productAlias);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(productDao.findProductByAlias(productAlias));
            setQuantity(cartItem,1);
        }else{
            setQuantity(cartItem,cartItem.getQuantity()+1);
        }

            save(cartItem);
            return cartItem;
        }

    public CartItem decrementQuantity(Set<CartItem> cartItems, String productAlias) {
        CartItem cartItem = getCartItemByProductAlias(cartItems, productAlias);
        if (cartItem == null) {
            throw new ProductCountException();
        }
        setQuantity(cartItem,cartItem.getQuantity()-1);
            if (cartItem.getQuantity().equals(0)) {
                delete(cartItem);
                return cartItem;
            }
        save(cartItem);
        return cartItem;
    }

    public CartItem deleteByProductAlias(Set<CartItem> cartItems, String productAlias) {
        CartItem cartItem = getCartItemByProductAlias(cartItems, productAlias);
        if(cartItem==null) {
            throw new ProductCountException("Невозможно удалить отсутствующий товар");
        }
        delete(cartItem);
        return cartItem;
    }
    public CartItem setQuantity(Cart cart, String productAlias, Integer newQuantity) {
        CartItem cartItem = getCartItemByProductAlias(cart.getItems(), productAlias);
        if(cartItem==null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(productDao.findProductByAlias(productAlias));
        }
        setQuantity(cartItem,newQuantity);
        save(cartItem);
        return cartItem;
    }


    @Transactional
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }



    public void delete(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }
    private void setQuantity(CartItem cartItem,Integer newQuantity){
        if(checkNewQuantity(cartItem.getProduct(),newQuantity)){
            cartItem.setQuantity(newQuantity);
        }else {
            throw  new ProductCountException();
        }
    }
    private CartItem getCartItemByProductAlias(Set<CartItem> cartItems, String productAlias){
        if (cartItems==null||cartItems.isEmpty()){
            return null;
        }
        Optional<CartItem> cartItemOptional = cartItems.stream().filter(x -> x.getProduct().getAlias().equals(productAlias)).findFirst();
        return cartItemOptional.orElse(null);
    }
    private boolean checkNewQuantity(Product product, Integer newQuantity) {
        if (newQuantity < 0) {
            return false;
        }
        return product.getCount() >= newQuantity;
    }

}
