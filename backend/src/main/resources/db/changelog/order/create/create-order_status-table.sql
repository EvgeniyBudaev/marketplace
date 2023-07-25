CREATE TABLE order_status
(
    id     BIGINT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(40)  not null unique,
    path   VARCHAR(300) not null unique
)