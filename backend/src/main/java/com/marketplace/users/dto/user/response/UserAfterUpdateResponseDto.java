package com.marketplace.users.dto.user.response;

import com.marketplace.users.model.AppUser;
import lombok.Data;

@Data
public class UserAfterUpdateResponseDto {
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phone;
    private String email;
    private String shippingAddress;

    public UserAfterUpdateResponseDto(AppUser user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.middleName = user.getMiddleName();
        this.lastName = user.getLastName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.shippingAddress = user.getShippingAddress();
    }
}
