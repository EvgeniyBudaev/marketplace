ALTER TABLE orders
    ADD CONSTRAINT orders_payment_variant
        FOREIGN KEY (payment)
            REFERENCES orders(payment);