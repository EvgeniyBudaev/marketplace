package com.marketplace.users.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;

@Entity
@Table(name = "refresh")
@Getter
@Setter
public class RefreshToken {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "token", nullable = false)
    private String token;
    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private AppUser user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RefreshToken that = (RefreshToken) o;
        return new EqualsBuilder().append(id, that.id).isEquals();
    }

    @Override
    public int hashCode() {
        return new
                HashCodeBuilder(17, 37).append(id).toHashCode();
    }

    @Override
    public String toString() {
        return "RefreshToken{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", user_id=" + user.getId() +
                '}';
    }
}
