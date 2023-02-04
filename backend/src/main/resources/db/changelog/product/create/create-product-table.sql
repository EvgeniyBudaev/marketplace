CREATE TABLE products (
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) not null,
    description VARCHAR(250) not null,
    alias VARCHAR(250) unique not null,
    enabled BOOLEAN default true,
    count INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(19,2) NOT NULL DEFAULT '0.00',
    rating DOUBLE default 0,
    catalog_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;