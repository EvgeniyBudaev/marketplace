CREATE TABLE properties
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT,
    property_type VARCHAR(30) not null unique ,
    property    TEXT not null,
    updated_at    TIMESTAMP default CURRENT_TIMESTAMP
) ENGINE = InnoDB;