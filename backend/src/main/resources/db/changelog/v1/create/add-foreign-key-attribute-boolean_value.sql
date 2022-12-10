ALTER TABLE boolean_value
    ADD CONSTRAINT fk_integer_attributes
        FOREIGN KEY (attribute_id)
            REFERENCES attributes(id);