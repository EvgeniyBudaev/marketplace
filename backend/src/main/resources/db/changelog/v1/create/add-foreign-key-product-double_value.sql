ALTER TABLE double_value
    ADD CONSTRAINT fk_double_product
        FOREIGN KEY (product_id)
            REFERENCES products(id);