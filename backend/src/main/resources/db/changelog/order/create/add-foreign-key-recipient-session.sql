ALTER TABLE recipient
    ADD CONSTRAINT fk_recipient_session
        FOREIGN KEY (session)
            REFERENCES session(id) ON DELETE CASCADE;