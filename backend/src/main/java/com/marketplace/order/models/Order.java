package com.marketplace.order.models;

import com.marketplace.users.model.SessionId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session")
    private SessionId sessionId;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "recipient_phone")
    private String recipientPhone;

    @Column(name = "recipient_email")
    private String recipientEmail;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "comment")
    private String comment;

    @Column(name = "payment")
    @Enumerated(EnumType.STRING)
    private EPaymentVariants paymentVariant;

    @Column(name = "amount")
    private String amount;

    @OneToMany(mappedBy = "order" )
    private Set<OrderItem> orderItems;

    @Column(name = "updated_at", updatable = false)
    private LocalDateTime updatedAt;


}
