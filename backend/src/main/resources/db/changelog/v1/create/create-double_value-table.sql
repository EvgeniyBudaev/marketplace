CREATE TABLE double_value
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT not null,
    product_id   BIGINT not null,
    value        DOUBLE not null
)