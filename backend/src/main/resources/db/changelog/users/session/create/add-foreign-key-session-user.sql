alter table session
    add constraint fk_session_user
        foreign key (user_id)
            references users(id);

