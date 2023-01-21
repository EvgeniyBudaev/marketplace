CREATE TABLE session
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid        VARCHAR(50) not null unique,
    user_id     BIGINT,
    cart_id     BIGINT,
    settings_id BIGINT,
    updated     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;