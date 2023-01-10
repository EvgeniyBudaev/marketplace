CREATE TABLE cart_items
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT  not null,
    quantity   INTEGER not null,
    cart_id    BIGINT  not null
) ENGINE = InnoDB;