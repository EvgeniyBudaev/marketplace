ALTER TABLE verification_tokens
    ADD CONSTRAINT fk_verification_token
        FOREIGN KEY (user_id)
            REFERENCES users(id);