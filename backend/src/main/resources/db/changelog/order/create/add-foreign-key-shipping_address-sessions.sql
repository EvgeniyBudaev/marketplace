ALTER TABLE shipping_address
    ADD CONSTRAINT fk_consumer_session
        FOREIGN KEY (session)
            REFERENCES session(id) ON DELETE CASCADE;