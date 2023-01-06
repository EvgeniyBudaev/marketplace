CREATE TABLE carts(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    uuid VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP
)ENGINE = InnoDB;