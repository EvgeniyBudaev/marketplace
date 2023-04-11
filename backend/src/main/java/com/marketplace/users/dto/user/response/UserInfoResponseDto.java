package com.marketplace.users.dto.user.response;

import com.marketplace.users.model.AppUser;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserInfoResponseDto {
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phone;
    private String email;
    private String shippingAddress;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private String uuid;
    private Set<String> permissions;

    public UserInfoResponseDto(AppUser user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.middleName = user.getMiddleName();
        this.lastName = user.getLastName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.shippingAddress = user.getShippingAddress();
        this.isEmailVerified = user.getIsEmailVerified();
        this.isPhoneVerified = user.getIsPhoneVerified();
        this.createdAt = user.getCreatedAt();
        this.modifyDate = user.getModifyDate();
        this.uuid = user.getSessionId().getUuid();
        this.permissions = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
    }
}
