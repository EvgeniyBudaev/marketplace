CREATE TABLE recipient
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    session    BIGINT not null,
    name       VARCHAR(50),
    surname    VARCHAR(50),
    phone      VARCHAR(15),
    email      VARCHAR(50),
    updated_at TIMESTAMP default CURRENT_TIMESTAMP
) ENGINE = InnoDB;