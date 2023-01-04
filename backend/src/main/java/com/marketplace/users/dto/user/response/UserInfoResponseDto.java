package com.marketplace.users.dto.user.response;

import com.marketplace.users.model.AppUser;
import lombok.Data;

import java.time.LocalDateTime;

@Data
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
    }
}
