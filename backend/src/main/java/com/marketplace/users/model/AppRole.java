package com.marketplace.users.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (!(o instanceof AppRole appRole)) return false;

        return new EqualsBuilder().append(id, appRole.id).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).toHashCode();
    }

    @Override
    public String toString() {
        return "AppRole{" +
                "id=" + id +
                ", name=" + name +
                ", description='" + description + '\'' +
                ", users=" + users +
                '}';
    }
}
