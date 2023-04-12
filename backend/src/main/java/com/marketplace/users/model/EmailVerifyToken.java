package com.marketplace.users.model;

import com.marketplace.users.model.enums.ETokenType;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;


@Entity
@Table(name = "verification_tokens")
@Getter
@Setter
public class EmailVerifyToken {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Column(name = "token_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ETokenType tokenType;

    @Column(name = "expired", nullable = false)
    private LocalDateTime expired;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    public EmailVerifyToken() {
    }

    public EmailVerifyToken(AppUser user, ETokenType tokenType, Duration duration, String token) {
        this.user = user;
        this.expired = LocalDateTime.now().plus(duration);
        this.tokenType = tokenType;
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        EmailVerifyToken that = (EmailVerifyToken) o;

        return new EqualsBuilder().append(id, that.id).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).toHashCode();
    }

    @Override
    public String toString() {
        return "VerificationToken{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", tokenType=" + tokenType +
                ", expired=" + expired +
                ", user_id=" + user.getId() +
                '}';
    }
}
