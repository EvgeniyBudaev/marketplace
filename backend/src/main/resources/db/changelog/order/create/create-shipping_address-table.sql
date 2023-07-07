CREATE TABLE shipping_address
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    session    BIGINT not null,
    address    VARCHAR(256),
    flat       VARCHAR(10),
    floor      VARCHAR(10),
    comment    VARCHAR(500),
    updated_at TIMESTAMP default CURRENT_TIMESTAMP
) ENGINE = InnoDB;