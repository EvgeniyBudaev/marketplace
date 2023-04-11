ALTER TABLE files
    ADD CONSTRAINT fk_files_product
        FOREIGN KEY (product_id)
            REFERENCES products(id)