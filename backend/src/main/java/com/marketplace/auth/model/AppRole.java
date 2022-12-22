package com.marketplace.auth.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class AppRole implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private ERole name;

    @Column(name = "description")
    private String description;
    @ManyToMany(mappedBy = "roles")
    List<AppUser> users;

    @Override
    public String getAuthority() {
        return this.name.name();
    }
}
