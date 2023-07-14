ALTER TABLE orders
    ADD CONSTRAINT fk_orders_session
        FOREIGN KEY (session)
            REFERENCES session(id)