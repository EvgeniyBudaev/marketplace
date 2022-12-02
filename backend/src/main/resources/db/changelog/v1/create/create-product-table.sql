CREATE TABLE products (
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) not null,
    description VARCHAR(250) not null,
    alias VARCHAR(250) unique,
    enabled BOOLEAN default true,
    count INTEGER,
    price VARCHAR(20),
    rating DOUBLE default 0,
    catalog_id BIGINT
);