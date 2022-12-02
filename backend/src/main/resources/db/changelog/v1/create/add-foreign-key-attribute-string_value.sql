ALTER TABLE string_value
    ADD CONSTRAINT fk_strings_attributes
        FOREIGN KEY (attribute_id)
            REFERENCES attributes(id);