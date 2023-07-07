package com.marketplace.order.controllers;

import com.marketplace.order.dto.request.ShippingAddressSaveRequestDto;
import com.marketplace.order.dto.response.ShippingAddressResponseDto;
import com.marketplace.order.mappers.ShippingAddressMappers;
import com.marketplace.order.models.ShippingAddress;
import com.marketplace.order.services.ShippingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/shipping")
public class ShippingAddressController {

    private final ShippingAddressService shippingAddressService;
    private final ShippingAddressMappers mapper;

    @Autowired
    public ShippingAddressController(ShippingAddressService shippingAddressService, ShippingAddressMappers mapper) {
        this.shippingAddressService = shippingAddressService;
        this.mapper = mapper;
    }

    @GetMapping("address/{uuid}")
    public ShippingAddressResponseDto getShippingAddress(@PathVariable(required = false) String uuid){
        ShippingAddress address = shippingAddressService.getShippingAddressBySession(uuid);
        if(address ==null){
            return new ShippingAddressResponseDto();
        }
        return mapper.entityToDto(address);
    }

    @PatchMapping("/address")
    public ShippingAddressResponseDto saveShippingAddress(@RequestBody ShippingAddressSaveRequestDto dto){
        ShippingAddress address = shippingAddressService.saveShippingAddress(dto);
        return mapper.entityToDto(address);
    }
}
