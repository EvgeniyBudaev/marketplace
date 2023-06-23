import React from "react";
import {ETypographyVariant, Typography} from "~/uikit";
import styles from "./About.css";

export const About: React.FC = () => {
  return (
    <section className="About">
      <h1 className="About-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Информация о магазине</Typography>
      </h1>
      <p className="About-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Bold}>Компания «FamilyMart»</Typography>
        &nbsp;
        <Typography variant={ETypographyVariant.TextB3Regular}>
          основана в 2023 году. Мы создали наш бренд, чтобы чтобы поставлять на Российский рынок
          продукцию, разработанную лучшими дизайнерами, соответствующий актуальным тенденциям и
          направлениям, высокого качества и по доступным ценам.
        </Typography>
      </p>
      <p className="About-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Наши изделия изготовлены из высококачественных материалов по современным технологиям на
          фабриках ведущих производителей отрасли. Мы сами формируем коллекции и ассортимент,
          учитывая опыт специалистов, известных в мире дизайна интерьера..
        </Typography>
      </p>
      <p className="About-Paragraph">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          Мы контролируем качество товара с начала его производства до момента отгрузки покупателю.
        </Typography>
      </p>
    </section>
  );
};

export function aboutLinks() {
  return [{rel: "stylesheet", href: styles}];
}
