ALTER TABLE order_items
    ADD CONSTRAINT fk_order_items_orders
        FOREIGN KEY (order_id)
            REFERENCES orders(id)