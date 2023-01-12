package com.marketplace.users.model;

import com.marketplace.users.model.enums.ECurrency;
import com.marketplace.users.model.enums.ELanguage;
import com.marketplace.users.model.enums.ETheme;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users_settings")
@Getter
@Setter
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private ETheme theme;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private ECurrency currency;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private ELanguage language;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @OneToOne(mappedBy = "userSettings")
    private SessionId sessionId;
}
