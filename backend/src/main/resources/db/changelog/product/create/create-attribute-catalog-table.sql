CREATE TABLE attributes_catalogs
(
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT not null,
    catalog_id   BIGINT not null
)ENGINE=InnoDB;