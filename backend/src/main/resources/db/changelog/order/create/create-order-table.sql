CREATE TABLE orders
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    session BIGINT not null,
    address    VARCHAR(256),
    flat       VARCHAR(10),
    floor      VARCHAR(10),
    recipient_name    VARCHAR(50),
    recipient_phone   VARCHAR(15),
    recipient_email   VARCHAR(50),
    comment    VARCHAR(500),
    payment    BIGINT not null ,
    amount     VARCHAR(20),
    status_id BIGINT not null,
    updated_at TIMESTAMP not null default CURRENT_TIMESTAMP,
    created_at TIMESTAMP not null default CURRENT_TIMESTAMP
) ENGINE = InnoDB;