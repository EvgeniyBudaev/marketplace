ALTER TABLE products
    ADD CONSTRAINT fk_products_catalog
        FOREIGN KEY (catalog_id)
            REFERENCES catalogs (id);

