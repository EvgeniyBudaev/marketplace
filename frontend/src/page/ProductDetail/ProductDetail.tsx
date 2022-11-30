import Link from "next/link";
import type { FC } from "react";
import { RatingNumber } from "src/components";
import { TProduct } from "src/types";
import classes from "./ProductDetail.module.scss";

export const ProductDetail: FC = () => {
  return (
    <div className={classes.Product}>
      <h1 className={classes.Title}>Венецианское зеркало</h1>
      <div className={classes.Navigation}>
        <RatingNumber rating={"5"} />
        <Link href={`product/venetian-mirrors/reviews`}>
          <span className={classes.NavigationText}>5 &nbsp; комментариев</span>
        </Link>
      </div>
      <div className={classes.ProductMainInfo}>
        <div className={classes.ColMedia}>
          <div className={classes.ProductGallery}>Slider</div>
        </div>
        <div className={classes.ColSpecification}>
          <div className={classes.ProductSpecification}>
            <h2 className={classes.ProductSpecificationTitle}>Описание</h2>
            <ul className={classes.ProductSpecificationList}>
              <li>Материал зеркала: стекло</li>
              <li>Материал рамы: дерево</li>
              <li>Цвет рамы: серебро</li>
              <li>Размер внешний, с рамой: 10 х 10 см</li>
              <li>Размер зеркала без рамы: 10 х 10 см</li>
              <li>Вес: 12 кг</li>
              <li>Наличие фацета: Да</li>
              <li>Форма: Овальная</li>
              <li>Производитель: Mirror Look</li>
            </ul>
            <div>Венецианское зеркало</div>
          </div>
        </div>
        <div className={classes.ColPrice}>
          <div className={classes.ProductPrice}>1 500 ₽</div>
          <div>
            <div className={classes.ColPriceTitle}>Товар:</div>{" "}
            <div className={classes.ProductStatus}>В наличии</div>
          </div>
          <div className={classes.ProductPay}>
            Картой онлайн/курьеру, наличными
          </div>
          Кнопка
        </div>
      </div>
    </div>
  );
};
