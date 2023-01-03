CREATE TABLE verification_tokens
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    token      VARCHAR(50) not null unique,
    token_type VARCHAR(20) not null,
    expired    TIMESTAMP   not null,
    user_id    BIGINT
)ENGINE=InnoDB;