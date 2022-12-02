CREATE TABLE integer_value
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT not null,
    product_id   BIGINT not null,
    value        INTEGER not null
)