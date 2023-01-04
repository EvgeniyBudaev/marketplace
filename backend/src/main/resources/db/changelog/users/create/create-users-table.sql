CREATE TABLE users(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) not null,
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20) ,
    email VARCHAR(60) not null unique,
    password VARCHAR(100),
    enabled BOOLEAN default true,
    shipping_address VARCHAR(250),
    is_email_verified BOOLEAN not null,
    is_phone_verified BOOLEAN not null,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;