ALTER TABLE attributes_catalogs
    ADD CONSTRAINT fk_attributes
        FOREIGN KEY (attribute_id)
            REFERENCES attributes (id);
