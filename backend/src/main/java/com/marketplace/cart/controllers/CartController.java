package com.marketplace.cart.controllers;


import com.marketplace.cart.dto.request.CartManageRequestDto;
import com.marketplace.cart.dto.request.CartRequestDto;
import com.marketplace.cart.dto.request.CartRequestDtoImpl;
import com.marketplace.cart.dto.request.CartSetQuantityRequestDto;
import com.marketplace.cart.dto.response.CartResponseDto;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import com.marketplace.properties.model.properties.GlobalProperty;
import com.marketplace.users.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;


@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    private final GlobalProperty globalProperty;


    @Autowired
    public CartController(CartService cartService, GlobalProperty globalProperty) {
        this.cartService = cartService;
        this.globalProperty = globalProperty;
    }


    @PostMapping
    public CartResponseDto getCart(Principal principal, @RequestBody CartRequestDtoImpl dto) {
        Cart cart = findCartByAuthority(principal, dto);

        return new CartResponseDto(cart,globalProperty.getPRODUCT_BASE_URL());
    }


    @PostMapping("/add")
    public CartResponseDto add(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        return new CartResponseDto(cartService.incrementQuantity(cart, dto.getProductAlias()),globalProperty.getPRODUCT_BASE_URL());
    }

    @PostMapping("/decrement")
    public CartResponseDto decrement(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        return new CartResponseDto(cartService.decrementQuantity(cart, dto.getProductAlias()),globalProperty.getPRODUCT_BASE_URL());
    }

    @PostMapping("/set_quantity")
    public CartResponseDto setQuantity(Principal principal, @Valid @RequestBody CartSetQuantityRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        return new CartResponseDto(cartService.setQuantity(cart, dto.getProductAlias(), dto.getNewQuantity()),globalProperty.getPRODUCT_BASE_URL());
    }

    @PostMapping("/remove")
    public CartResponseDto remove(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        return new CartResponseDto(cartService.removeItemFromCart(cart, dto.getProductAlias()),globalProperty.getPRODUCT_BASE_URL());
    }

    @PostMapping("/clear")
    public CartResponseDto clear(Principal principal, @RequestBody CartRequestDtoImpl dto) {
        Cart cart = findCartByAuthority(principal, dto);
        return new CartResponseDto(cartService.clearCart(cart),globalProperty.getPRODUCT_BASE_URL());
    }


    private Cart findCartByAuthority(Principal principal, CartRequestDto dto) {
        Cart cart;
        if (principal != null) {
            AppUser user = cartService.getUserByEmail(principal);
            cart = cartService.getFullCartForAuthUser(user);
        } else {
            cart = cartService.getFullCartByUUIDForNonAuthUser(dto.getUuid());
        }
        return cart;
    }


}