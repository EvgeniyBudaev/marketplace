ALTER TABLE products_selectable
    ADD CONSTRAINT fk_product_select
        FOREIGN KEY (selectable_value_id)
            REFERENCES selectable_values(id) ON DELETE CASCADE;