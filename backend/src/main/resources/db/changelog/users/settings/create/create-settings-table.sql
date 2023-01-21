CREATE TABLE users_settings
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    theme      VARCHAR(15) NOT NULL  default 'LIGHT',
    currency   VARCHAR(5)  NOT NULL  default 'RUB',
    language   VARCHAR(5)  NOT NULL  default 'RU',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)