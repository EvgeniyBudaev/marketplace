ALTER TABLE double_value
    ADD CONSTRAINT fk_double_attributes
        FOREIGN KEY (attribute_id)
            REFERENCES attributes(id);