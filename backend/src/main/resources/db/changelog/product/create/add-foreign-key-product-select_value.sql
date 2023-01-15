ALTER TABLE products_selectable
    ADD CONSTRAINT fk_select_product
        FOREIGN KEY (product_id)
            REFERENCES products(id);