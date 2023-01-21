CREATE TABLE roles
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50)  not null,
    description VARCHAR(250) not null
)ENGINE=InnoDB;