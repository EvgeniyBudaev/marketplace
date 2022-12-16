ALTER TABLE users_roles
    ADD CONSTRAINT fk_users
        FOREIGN KEY (user_id)
            REFERENCES users(id);
