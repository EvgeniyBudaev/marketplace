CREATE TABLE files(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT not null,
    type VARCHAR(30) not null,
    url VARCHAR(300) not null
)