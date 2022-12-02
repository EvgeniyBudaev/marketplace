ALTER TABLE integer_value
    ADD CONSTRAINT fk_integer_product
        FOREIGN KEY (product_id)
            REFERENCES products(id);