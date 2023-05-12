package com.marketplace.users.model;

import com.marketplace.cart.model.Cart;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "session")
@Getter
@Setter
public class SessionId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid", unique = true, nullable = false)
    private String uuid;

    @Column(name = "updated")
    private LocalDateTime updated;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private AppUser user;
    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "settings_id", referencedColumnName = "id")
    private UserSettings userSettings;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SessionId sessionId = (SessionId) o;
        return id.equals(sessionId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
