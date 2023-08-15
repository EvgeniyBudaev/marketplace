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

    @Column(name = "address")
    private String address;

    @Column(name = "flat")
    private String flat;

    @Column(name = "floor")
    private String floor;

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

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(columnDefinition = "status_id")
    private OrderStatus status;

}
