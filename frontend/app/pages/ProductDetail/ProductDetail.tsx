import type { FC } from "react";
import isEmpty from "lodash/isEmpty";
import styles from "./ProductDetail.module.css";
import { TProductDetail } from "~/shared/api/products";
import { formatValueWithSpaces } from "~/utils";

type TProps = {
  product: TProductDetail;
};

export const ProductDetail: FC<TProps> = ({ product }) => {
  return (
    <div className="ProductDetail">
      <h1 className="ProductDetail-Title">{product.name}</h1>
      <div className="ProductDetail-Navigation"></div>
      <div className="ProductDetail-Info">
        <div className="ProductDetail-ColMedia">
          <div className="ProductDetail-Gallery">Slider</div>
        </div>
        <div className="ProductDetail-ColSpecification">
          <div className="ProductDetail-Specification">
            <h2 className="ProductDetail-SpecificationTitle">Описание</h2>
            <ul className="ProductDetail-SpecificationList">
              {!isEmpty(product.attributes) &&
                product.attributes.map((item) => (
                  <li key={item.attributeName}>
                    {item.attributeName}:&nbsp;{item.value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="ProductDetail-ColPrice">
          <div className="ProductDetail-Price">
            {formatValueWithSpaces(parseInt(product.price))} ₽
          </div>
          <div>
            <div className="ProductDetail-ColPriceTitle">Товар:</div>&nbsp;
            <div className="ProductDetail-Status">
              {Number(product.count) > 0 ? "В наличии" : "Товар отсутствует"}
            </div>
          </div>
          <div className="ProductDetail-Pay">Картой онлайн/курьеру, наличными</div>
          TODO: Добавить кнопку!!!
        </div>
      </div>
    </div>
  );
};

export function productDetailLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
