CREATE TABLE carts(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP
)ENGINE = InnoDB;