import type { FC } from "react";
import { ETypographyVariant, Typography } from "#app/uikit";
import styles from "./Contacts.css";

export const Contacts: FC = () => {
  return (
    <section className="Contacts">
      <h1 className="Contacts-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          Контакты
        </Typography>
      </h1>
      <h2 className="Contacts-SubTitle">
        <Typography variant={ETypographyVariant.TextH2Medium}>
          Реквизиты:
        </Typography>
      </h2>
      <div>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Regular}>
            ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ИВАНОВ ИВАН ИВАНОВИЧ
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Юридический адрес организации:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            143409, Россия, Московская область, г. Красногорск, ул. Успенская,
            д. 24
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            ИНН:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            583518887053
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            ОГРН:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            319508100027037
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Расчетный счет:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            40802810800002386718
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Банк:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            АО «ТИНЬКОФФ БАНК»
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            ИНН банка:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            7710140679
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            БИК банка:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            044525974
          </Typography>
        </p>
        <p className="Contacts-Paragraph">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            Юридический адрес банка:&nbsp;
          </Typography>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            Москва, 127287, ул.Хуторская 2-я, д. 38А, стр. 26
          </Typography>
        </p>
      </div>
    </section>
  );
};

export function contactsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
