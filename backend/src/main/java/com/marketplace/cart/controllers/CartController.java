package com.marketplace.cart.controllers;


import com.marketplace.cart.dto.request.CartManageRequestDto;
import com.marketplace.cart.dto.request.CartRequestDto;
import com.marketplace.cart.dto.request.CartRequestDtoImpl;
import com.marketplace.cart.dto.request.CartSetQuantityRequestDto;
import com.marketplace.cart.dto.response.CartResponseDto;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.service.CartService;
import com.marketplace.storage.services.DocumentStorageService;
import com.marketplace.users.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    private final DocumentStorageService documentStorageService;


    @Autowired
    public CartController(CartService cartService, DocumentStorageService documentStorageService) {
        this.cartService = cartService;
        this.documentStorageService = documentStorageService;
    }


    @PostMapping
    public CartResponseDto getCart(Principal principal, @RequestBody CartRequestDtoImpl dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }


    @PostMapping("/add")
    public CartResponseDto add(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }

    @PostMapping("/decrement")
    public CartResponseDto decrement(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }

    @PostMapping("/set_quantity")
    public CartResponseDto setQuantity(Principal principal, @Valid @RequestBody CartSetQuantityRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }

    @PostMapping("/remove")
    public CartResponseDto remove(Principal principal, @Valid @RequestBody CartManageRequestDto dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }

    @PostMapping("/clear")
    public CartResponseDto clear(Principal principal, @RequestBody CartRequestDtoImpl dto) {
        Cart cart = findCartByAuthority(principal, dto);
        Map<Long,String> productDefaultImages = documentStorageService.getDefaultImageUrl(cart.getItems().stream().map(x->x.getProduct().getId()).toList());
        return new CartResponseDto(cart,productDefaultImages);
    }


    public Cart findCartByAuthority(Principal principal, CartRequestDto dto) {
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