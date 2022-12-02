ALTER TABLE string_value
    ADD CONSTRAINT fk_strings_product
        FOREIGN KEY (product_id)
            REFERENCES products(id);