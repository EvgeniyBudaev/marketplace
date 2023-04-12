package com.marketplace.users.controllers;

import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.mappers.UserMapper;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.service.SessionIdService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {
    private final SessionIdService sessionIdService;
    private final UserMapper userMapper;

    public SessionController(SessionIdService sessionIdService, UserMapper userMapper) {
        this.sessionIdService = sessionIdService;
        this.userMapper = userMapper;
    }

    @GetMapping("/{uuid}")
    public void getSession(@PathVariable(required = false) String uuid) {
        sessionIdService.getSession(uuid);
    }

    @GetMapping("details/{uuid}")
    public UserInfoResponseDto getUserDetailsBySessionId(@PathVariable String uuid, Principal principal) {
        if (principal != null) {
            return userMapper.entityToUserInfoDto(sessionIdService.getUserInfo(principal));
        }
        SessionId sessionId = sessionIdService.getSession(uuid);
        UserInfoResponseDto dto = new UserInfoResponseDto();
        dto.setIsEmailVerified(false);
        dto.setIsPhoneVerified(false);
        dto.setModifyDate(sessionId.getUpdated());
        dto.setCreatedAt(sessionId.getUpdated());
        dto.setUuid(sessionId.getUuid());
        return dto;
    }
}
