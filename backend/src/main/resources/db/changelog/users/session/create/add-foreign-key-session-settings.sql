ALTER TABLE session
    ADD CONSTRAINT fk_session_settings
        FOREIGN KEY (settings_id)
            REFERENCES users_settings(id)