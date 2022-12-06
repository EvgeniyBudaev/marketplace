CREATE TABLE catalogs(
        id      BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(250) not null ,
        alias VARCHAR(250) unique not null,
        image VARCHAR(400),
        enabled BOOLEAN default true
)