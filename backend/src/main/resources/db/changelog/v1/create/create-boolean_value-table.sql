CREATE TABLE boolean_value
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT not null,
    product_id   BIGINT not null,
    value        BOOLEAN not null
)