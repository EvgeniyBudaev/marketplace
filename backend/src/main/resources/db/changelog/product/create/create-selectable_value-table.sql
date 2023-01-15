CREATE TABLE selectable_values
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT not null,
    value VARCHAR(350) not null
)ENGINE=InnoDB;