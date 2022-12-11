import type {FC} from "react";
import styles from "./Contacts.module.css";

export const Contacts: FC = () => {
    return (
        <section className="Contacts">
            <h1 className="Contacts-Title">Контакты</h1>
            <h2 className="Contacts-SubTitle">Реквизиты:</h2>
            <div>
                <p className='Contacts-Paragraph'>
                    ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ИВАНОВ ИВАН ИВАНОВИЧ
                </p>
                <p className="Contacts-Paragraph">
                    <strong>Юридический адрес организации: </strong>143409, Россия,
                    Московская область, г. Красногорск, ул. Успенская, д. 24
                </p>
                <p className="Contacts-Paragraph">
                    <strong>ИНН: </strong>583518887053
                </p>
                <p className="Contacts-Paragraph">
                    <strong>ОГРН: </strong>319508100027037
                </p>
                <p className="Contacts-Paragraph">
                    <strong>Расчетный счет: </strong>40802810800002386718
                </p>
                <p className="Contacts-Paragraph">
                    <strong>Банк: </strong>АО «ТИНЬКОФФ БАНК»
                </p>
                <p className="Contacts-Paragraph">
                    <strong>ИНН банка: </strong>7710140679
                </p>
                <p className="Contacts-Paragraph">
                    <strong>БИК банка: </strong>044525974
                </p>
                <p className="Contacts-Paragraph">
                    <strong>Юридический адрес банка: </strong>Москва, 127287, ул.Хуторская
                    2-я, д. 38А, стр. 26
                </p>
            </div>
        </section>
    );
};

export function contactsLinks() {
    return [{ rel: "stylesheet", href: styles }];
}
