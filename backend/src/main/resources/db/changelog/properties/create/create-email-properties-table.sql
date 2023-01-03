CREATE TABLE email_properties
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT,
    property_type VARCHAR(30) not null,
    properties    VARCHAR(500) not null,
    profile_name  VARCHAR(50),
    updated_at    TIMESTAMP default CURRENT_TIMESTAMP
) ENGINE = InnoDB;