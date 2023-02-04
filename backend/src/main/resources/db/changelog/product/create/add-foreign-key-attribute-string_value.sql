ALTER TABLE selectable_values
    ADD CONSTRAINT fk_select_attributes
        FOREIGN KEY (attribute_id)
            REFERENCES attributes(id) ON DELETE CASCADE;