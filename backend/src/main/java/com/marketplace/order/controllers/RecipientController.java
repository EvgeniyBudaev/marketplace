package com.marketplace.order.controllers;

import com.marketplace.order.dto.request.RecipientSaveRequestDto;
import com.marketplace.order.dto.response.RecipientResponseDto;
import com.marketplace.order.mappers.RecipientMappers;
import com.marketplace.order.models.Recipient;
import com.marketplace.order.services.RecipientService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/recipients")
public class RecipientController {
    private final RecipientService recipientService;
    private final RecipientMappers recipientMappers;

    public RecipientController(RecipientService recipientService, RecipientMappers recipientMappers) {
        this.recipientService = recipientService;
        this.recipientMappers = recipientMappers;
    }

    @PatchMapping
    public RecipientResponseDto saveRecipient(@RequestBody RecipientSaveRequestDto dto){
        Recipient recipient = recipientService.saveRecipient(dto);
        return recipientMappers.entityToDto(recipient);
    }

    @GetMapping("{uuid}")
    public RecipientResponseDto getRecipientBySession(@PathVariable(required = false) String uuid){
        Recipient recipient = recipientService.getRecipientBySession(uuid);
        if(recipient==null){
            recipient = new Recipient();
        }
        return recipientMappers.entityToDto(recipient);
    }

}
