CREATE TABLE products (
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) not null,
    description VARCHAR(250) not null,
    alias VARCHAR(250) unique,
    enabled BOOLEAN default true,
    count INTEGER,
    price DECIMAL(19,2),
    rating DOUBLE default 0,
    catalog_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;