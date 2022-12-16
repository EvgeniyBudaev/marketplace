import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "~/enums";
import { TProduct } from "~/shared/api/products";
import { Button } from "~/uikit";
import { createPath, formatValueWithSpaces } from "~/utils";
import { AttributeItem } from "../AttributeItem";
import styles from "./ProductListItem.module.css";

type TProps = {
  product: TProduct;
  isCardsLine: boolean;
};

export const ProductListItem: FC<TProps> = ({ product, isCardsLine }) => {
  const count = Number(product.count);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 500px)" });

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
    <li
      className={clsx("ProductListItem", {
        ProductListItem__line: isCardsLine,
      })}
    >
      <div className="ProductListItem-Wrapper">
        <div className="ProductListItem-Content">
          <div className="ProductListItem-ContentImg">
            <Link
              to={createPath({
                route: ERoutes.ProductDetail,
                params: { alias: product.alias },
              })}
            >
              <img
                className="ProductListItem-ContentImage"
                alt={product.name}
                src={
                  "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi"
                }
                width={imageResponsiveSizeWidth()}
                height={imageResponsiveSizeHeight()}
              />
            </Link>
          </div>
          <div className="ProductListItem-ContentDescription">
            <Link
              className="ProductListItem-ContentTitle"
              to={createPath({
                route: ERoutes.ProductDetail,
                params: { alias: product.alias },
              })}
            >
              {product.name}
            </Link>
          </div>
          <ul className="ProductListItem-ContentDescriptionLine">
            <li className="ProductListItem-ContentDescriptionLinePrice">
              {formatValueWithSpaces(parseInt(product.price))} ₽
            </li>
            <li className="ProductListItem-ContentTitleLine">
              <Link
                to={createPath({
                  route: ERoutes.ProductDetail,
                  params: { alias: product.alias },
                })}
              >
                <span className="ProductListItem-ContentTitle">{product.description}</span>
              </Link>
            </li>
            {product.attributes.map((item) => (
              <AttributeItem key={item.attributeName} attribute={item} />
            ))}
            <li className="ProductListItem-ContentDescriptionLineStatus">
              {count > 0 ? "В наличии" : "Товар отсутствует"}
            </li>
            <li className="ProductListItem-ContentDescriptionLineAddToCartLine">
              <button>Click</button>
            </li>
          </ul>
        </div>
        <div className="ProductListItem-Footer">
          <div className="ProductListItem-FooterPrice">
            {formatValueWithSpaces(parseInt(product.price))} ₽
          </div>
          <div className="ProductListItem-FooterStatus">
            {count > 0 ? "В наличии" : "Товар отсутствует"}
          </div>
          <div className="ProductListItem-FooterAddToCartGrid">
            <Button
              className="ProductListItem-ButtonAddToCart"
              isDisabled={count <= 0}
              onClick={() => {}}
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export function productListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
