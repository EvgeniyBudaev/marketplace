import type { FC } from "react";
import isEmpty from "lodash/isEmpty";
import type { TProductDetail } from "~/shared/api/products";
import { formatCurrency, formatProxy } from "~/utils";
import styles from "./ProductDetail.module.css";
import isNil from "lodash/isNil";

type TProps = {
  product: TProductDetail;
};

export const ProductDetail: FC<TProps> = ({ product }) => {
  const imageProduct = formatProxy(
    !isNil(product?.images)
      ? product.images[0]
      : "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png",
  );
  const isMobileScreen = false;

  const imageResponsiveSizeWidth = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 140;
    }
  };

  const imageResponsiveSizeHeight = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 140;
    }
  };

  return (
    <div className="ProductDetail">
      <h1 className="ProductDetail-Title">{product.name}</h1>
      <div className="ProductDetail-Navigation"></div>
      <div className="ProductDetail-Info">
        <div className="ProductDetail-ColMedia">
          <div className="ProductDetail-Gallery">
            Slider
            <img
              className=""
              alt={product.name}
              src={imageProduct}
              width={imageResponsiveSizeWidth()}
              height={imageResponsiveSizeHeight()}
            />
          </div>
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
          <div className="ProductDetail-Price">{formatCurrency(parseInt(product.price))} ₽</div>
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
