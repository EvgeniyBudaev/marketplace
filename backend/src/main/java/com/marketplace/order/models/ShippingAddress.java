package com.marketplace.order.models;

import com.marketplace.users.model.SessionId;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_address")
@Getter
@Setter
public class ShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session")
    private SessionId sessionId;

    @Column(name = "address")
    private String address;

    @Column(name = "flat")
    private String flat;

    @Column(name = "floor")
    private String floor;

    @Column(name = "comment")
    private String comment;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;
}
