CREATE TABLE products_selectable
(
    id                  BIGINT PRIMARY KEY AUTO_INCREMENT,
    selectable_value_id BIGINT not null,
    product_id          BIGINT not null
)ENGINE=InnoDB;