ALTER TABLE refresh
    ADD CONSTRAINT fk_users_refresh
        FOREIGN KEY (id)
            REFERENCES users(id)