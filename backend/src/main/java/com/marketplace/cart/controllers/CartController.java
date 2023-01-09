package com.marketplace.cart.controllers;


import com.marketplace.cart.dto.request.CartManageRequestDto;
import com.marketplace.cart.dto.request.CartRequestDto;
import com.marketplace.cart.dto.response.CartResponseDto;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;



@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @PostMapping
    public CartResponseDto getCart(Principal principal, @RequestBody CartRequestDto dto) {
        Cart cart;
        if(principal!=null){
            cart = cartService.getCurrentCartForAuthUser(principal.getName());
        }else {
            cart = cartService.getCurrentCartByUUIDForNonAuthUser(dto.getUuid());
            /*Доступ неавторизованного пользователя к корзине авторизованного*/
            if (cart.getUser()!=null){
                throw new AccessDeniedException("Доступ невозможен");
            }
        }
        return new CartResponseDto(cart);
    }


    @PostMapping("/add")
    public CartResponseDto add(Principal principal, @RequestBody CartManageRequestDto dto) {
        Cart cart;
        if(principal!=null){
            cart = cartService.getCurrentCartForAuthUser(principal.getName());
        }else {
            cart = cartService.getCurrentCartByUUIDForNonAuthUser(dto.getUuid());
            /*Доступ неавторизованного пользователя к корзине авторизованного*/
            if (cart.getUser()!=null){
                throw new AccessDeniedException("Доступ невозможен");
            }
        }
        return new CartResponseDto(cartService.incrementQuantity(cart, dto.getProductAlias()));
    }

    @PostMapping("/decrement")
    public CartResponseDto decrement(Principal principal, @RequestBody CartManageRequestDto dto) {
        Cart cart;
        if(principal!=null){
            cart = cartService.getCurrentCartForAuthUser(principal.getName());
        }else {
            cart = cartService.getCurrentCartByUUIDForNonAuthUser(dto.getUuid());
            /*Доступ неавторизованного пользователя к корзине авторизованного*/
            if (cart.getUser()!=null){
                throw new AccessDeniedException("Доступ невозможен");
            }
        }
        return new CartResponseDto(cartService.decrementQuantity(cart, dto.getProductAlias()));
    }

    /*@PostMapping("/remove")
    public CartResponseDto remove(Principal principal, @RequestBody CartManageRequestDto dto) {
        Cart cart = cartService.removeItemFromCart(getCurrentCartUuid(principal,dto.getUuid()), dto.getProductAlias());
        return new CartResponseDto(cart);
    }

    @PostMapping("/clear")
    public CartResponseDto clear(Principal principal, @RequestBody CartClearRequestDto dto) {
        Cart cart = cartService.clearCart(getCurrentCartUuid(principal,dto.getUuid()));
        return new CartResponseDto(cart);*/

    /*@PostMapping("/merge")
    public CartResponseDto merge() {
        cartService.merge(
                getCurrentCartUuid(username, null),
                getCurrentCartUuid(null, uuid)
        );
    }*/



}
