import type { FC } from "react";
import styles from "./Delivery.module.css";
import { ETypographyVariant, Typography } from "~/uikit";

export const Delivery: FC = () => {
  return (
    <section className="Delivery">
      <h1 className="Delivery-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Доставка и оплата</Typography>
      </h1>
      <h2 className="Delivery-SubTitle">
        <Typography variant={ETypographyVariant.TextH2Medium}>Как оформить заказ</Typography>
      </h2>
      <p className="Delivery-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Оформить заказ на нашем сайте легко. Просто добавьте выбранные товары в корзину, а затем
          перейдите на страницу Корзина, проверьте правильность заказанных позиций и нажмите кнопку
          «Перейти к оформлению». Процесс оформления состоит из трёх шагов:
        </Typography>
      </p>
      <h4 className="Delivery-SubTitle">
        <Typography variant={ETypographyVariant.TextH4Medium}>Заполнение адреса</Typography>
      </h4>
      <p className="Delivery-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Заполните обязательное поле адрес доставки или выберите адрес на карте. Дополнительно
          можете указать номер квартиры, этажа, подъезда, домофона и оставить комментарий для
          курьера.
        </Typography>
      </p>
      <h4 className="Delivery-SubTitle">
        <Typography variant={ETypographyVariant.TextH4Medium}>Получатель</Typography>
      </h4>
      <p className="Delivery-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Введите данные получателя: имя, фамилия, номер телефона, адрес, электронной почты.
        </Typography>
      </p>
      <h4 className="Delivery-SubTitle">
        <Typography variant={ETypographyVariant.TextH4Medium}>Оформление заказа</Typography>
      </h4>
      <p className="Delivery-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Проверьте правильность введенных данных: адрес доставки, заказанные позиции, данные о
          получателе. Выберите способ оплаты. После проверки проверки данных нажмите кнопку
          «Оформить заказ». Вам на указанную электронную почту и на почту магазина придет письмо с
          информацией о заказе. После оформления заказа с Вами свяжется менеджер магазина для
          уточнения деталей.
        </Typography>
      </p>
      <p className="Delivery-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Наш сервис запоминает данные о пользователе, информацию о заказе и в следующий раз
          предложит вам повторить к вводу данные предыдущего заказа.
        </Typography>
      </p>
    </section>
  );
};

export function deliveryLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
