package com.marketplace.auth.dto.user.request;

import com.marketplace.auth.model.AppUser;
import com.marketplace.auth.validators.PhoneNumber;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
public class RegisterUserRequestDto {
    private Long id;
    @NotNull
    @Size(min = 2,max = 50)
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
    @Size(min = 6,max = 50)
    private String password;

    public AppUser convertToUser(){
        AppUser user = new AppUser();
        user.setId(this.id);
        user.setFirstName(this.firstName);
        user.setMiddleName(this.middleName);
        user.setLastName(this.lastName);
        user.setPhone(this.phone);
        user.setEmail(this.email);
        return user;
    }
}
