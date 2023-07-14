CREATE TABLE order_items
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id    BIGINT  not null,
    product_name VARCHAR(250),
    product_id BIGINT  not null,
    quantity   INTEGER not null,
    price DECIMAL(19,2) NOT NULL
)