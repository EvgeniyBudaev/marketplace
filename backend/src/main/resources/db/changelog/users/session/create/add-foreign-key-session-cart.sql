alter table session
    add constraint fk_session_cart
        foreign key (cart_id)
            references carts(id);