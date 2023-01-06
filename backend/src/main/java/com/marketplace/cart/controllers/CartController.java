package com.marketplace.cart.controllers;

import com.marketplace.cart.dto.request.CartClearRequestDto;
import com.marketplace.cart.dto.request.CartManageRequestDto;
import com.marketplace.cart.dto.request.CartRequestDto;
import com.marketplace.cart.dto.response.CartResponseDto;
import com.marketplace.cart.service.CartService;
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
        if(principal!=null){
            return cartService.getCurrentCartByUUIDForAuthUser(principal.getName());
        }
        return cartService.getCurrentCartByUUIDForNonAuthUser(dto.getUuid());
    }


    @PostMapping("/add")
    public CartResponseDto add(Principal principal, @RequestBody CartManageRequestDto dto) {
        return cartService.addToCart(getCurrentCartUuid(principal,dto.getUuid()), dto.getProductAlias());
    }

    @PostMapping("/decrement")
    public CartResponseDto decrement(Principal principal, @RequestBody CartManageRequestDto dto) {
       return cartService.decrementItem(getCurrentCartUuid(principal,dto.getUuid()), dto.getProductAlias());
    }

    @PostMapping("/remove")
    public CartResponseDto remove(Principal principal, @RequestBody CartManageRequestDto dto) {
        return cartService.removeItemFromCart(getCurrentCartUuid(principal,dto.getUuid()), dto.getProductAlias());
    }

    @PostMapping("/clear")
    public CartResponseDto clear(Principal principal, @RequestBody CartClearRequestDto dto) {
        return cartService.clearCart(getCurrentCartUuid(principal,dto.getUuid()));
    }

    /*@PostMapping("/merge")
    public CartResponseDto merge() {
        cartService.merge(
                getCurrentCartUuid(username, null),
                getCurrentCartUuid(null, uuid)
        );
    }*/

    private String getCurrentCartUuid(Principal principal, String uuid) {
        if (principal != null) {
            return principal.getName();
        }
        return uuid;
    }

}
