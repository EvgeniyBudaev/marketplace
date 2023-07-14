CREATE TABLE orders
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    session BIGINT not null,
    shipping_address VARCHAR(400),
    recipient_name    VARCHAR(50),
    recipient_phone   VARCHAR(15),
    recipient_email   VARCHAR(50),
    comment    VARCHAR(500),
    payment    VARCHAR(20),
    amount     VARCHAR(20),
    updated_at TIMESTAMP not null default CURRENT_TIMESTAMP
) ENGINE = InnoDB;