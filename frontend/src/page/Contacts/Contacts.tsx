import React from "react";
import classes from "./Contacts.module.scss";

export const Contacts: React.FC = () => {
  return (
    <section className={classes.Contacts}>
      <h1 className={classes.ContactsTitle}>Контакты</h1>
      <h2 className={classes.ContactsSubTitle}>Реквизиты:</h2>
      <div>
        <p className={classes.ContactsParagraph}>MARKETPLACE</p>
        <p className={classes.ContactsParagraph}>
          <strong>Юридический адрес организации: </strong>143409, Россия,
          Московская область, г. Красногорск, ул. Успенская, д. 24
        </p>
      </div>
    </section>
  );
};
