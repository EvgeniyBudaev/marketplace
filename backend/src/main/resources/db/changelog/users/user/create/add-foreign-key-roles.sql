ALTER TABLE users_roles
    ADD CONSTRAINT fk_roles
        FOREIGN KEY (role_id)
            REFERENCES roles(id);