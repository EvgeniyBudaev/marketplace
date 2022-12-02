CREATE TABLE attributes
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(250) not null,
    enabled BOOLEAN default true,
    type    VARCHAR(90) not null
)