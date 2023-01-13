package com.marketplace.users.controllers;

import com.marketplace.users.service.SessionIdService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {
    private final SessionIdService sessionIdService;

    public SessionController(SessionIdService sessionIdService) {
        this.sessionIdService = sessionIdService;
    }

    @GetMapping("/{uuid}")
    public void getSession(@PathVariable(required = false) String uuid){
        sessionIdService.getSession(uuid);
    }
}
