ALTER TABLE boolean_value
    ADD CONSTRAINT fk_boolean_product
        FOREIGN KEY (product_id)
            REFERENCES products(id);