package com.marketplace.users.dto.user.request;

import com.marketplace.users.model.AppUser;
import com.marketplace.users.validators.PhoneNumber;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
public class RegisterUserRequestDto {
    private Long id;
    @NotNull
    @Size(min = 2, max = 50)
    private String firstName;
    @Size(max = 50)
    private String middleName;
    @Size(max = 50)
    private String lastName;
    @PhoneNumber
    private String phone;
    @Email
    @NotBlank
    private String email;
    @NotNull
    @Size(min = 6, max = 50)
    private String password;
    @NotNull
    @Size(min = 15, max = 250)
    private String shippingAddress;
    @NotNull
    private String uuid;

    public AppUser convertToUser() {
        AppUser user = new AppUser();
        user.setId(this.id);
        user.setFirstName(this.firstName);
        user.setMiddleName(this.middleName);
        user.setLastName(this.lastName);
        user.setPhone(this.phone);
        user.setEmail(this.email);
        user.setShippingAddress(shippingAddress);
        return user;
    }
}
