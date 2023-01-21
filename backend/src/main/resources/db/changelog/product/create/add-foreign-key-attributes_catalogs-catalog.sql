ALTER TABLE attributes_catalogs
    ADD CONSTRAINT fk_catalogs
        FOREIGN KEY (catalog_id)
            REFERENCES catalogs (id);