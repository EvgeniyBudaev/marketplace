INSERT INTO users (first_name, middle_name, last_name, phone, email, password, enabled, is_email_verified,
                   is_phone_verified,created_at,shipping_address)
VALUES ('Иванов', 'Иван', 'Иванович', '+79219516997', 'pum@mail.ru',
        '$2a$12$aZBg3grljVawCDuxUWLI0O88SVG2zMijN2eSjJR94xYYdfRLX1s/e', true, false, false,CURRENT_TIMESTAMP,'Санкт-Петербург Смольный пр-т')