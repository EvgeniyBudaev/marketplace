import React from "react";
import classes from "./About.module.scss";

export const About: React.FC = () => {
  return (
    <section className={classes.About}>
      <h1 className={classes.AboutTitle}>Информация о магазине</h1>
      <p className={classes.AboutParagraph}>
        <strong>Компания «Marketplace»</strong> основана в 2023 году. Мы создали
        наш бренд, чтобы чтобы поставлять на Российский рынок зеркала и
        зеркальный декор, разработанный лучшими дизайнерами, соответствующий
        актуальным тенденциям и направлениям, высокого качества и по доступным
        ценам.
      </p>
      <p className={classes.AboutParagraph}>
        Наши изделия изготовлены из высококачественных материалов по современным
        технологиям на фабриках ведущих производителей отрасли. Мы сами
        формируем коллекции и ассортимент, учитывая опыт специалистов, известных
        в мире дизайна интерьера.
      </p>
      <p className={classes.AboutParagraph}>
        Мы контролируем качество товара с начала его производства до момента
        отгрузки покупателю.
      </p>
    </section>
  );
};
