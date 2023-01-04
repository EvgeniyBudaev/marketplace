import { forwardRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { ERoutes } from "~/enums";

import type { TActionCartItemChange, TCart } from "~/shared/api/cart";
import type { TProduct } from "~/shared/api/products";
import { Button } from "~/uikit";
import { createPath, formatProxy, formatCurrency } from "~/utils";
import { AttributeItem } from "../AttributeItem";
import styles from "./ProductListItem.module.css";

type TProps = {
  cart: TCart;
  product: TProduct;
  isCardsLine: boolean;
  onChangeCartItem: (action: TActionCartItemChange) => Promise<void>;
};

export const ProductListItem = forwardRef<HTMLLIElement, TProps>(function ProductListItem(
  { cart, product, isCardsLine, onChangeCartItem },
  ref,
) {
  const ROUTE_PRODUCT_DETAIL = createPath({
    route: ERoutes.Cart,
  });
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

  const renderButton = (product: TProduct) => {
    const isProductAtCart =
      !isEmpty(cart && cart.products) &&
      cart.products.some((item) => item.product.id === product.id);

    return isProductAtCart ? (
      !isEmpty(cart && cart.products) && (
        <Link className="ProductListItem-ButtonGoAtCart" to={ROUTE_PRODUCT_DETAIL}>
          В корзине
        </Link>
      )
    ) : (
      <Button
        className="ProductListItem-ButtonAddToCart"
        isDisabled={count <= 0}
        onClick={() =>
          onChangeCartItem({
            payload: {
              id: product.id,
              product,
              quantity: 1,
            },
          })
        }
      >
        В корзину
      </Button>
    );
  };

  return (
    <li
      className={clsx("ProductListItem", {
        ProductListItem__line: isCardsLine,
      })}
      ref={ref}
    >
      <div className="ProductListItem-Wrapper">
        <div className="ProductListItem-Content">
          <div className="ProductListItem-ContentImg">
            <Link to={ROUTE_PRODUCT_DETAIL}>
              <img
                className="ProductListItem-ContentImage"
                alt={product.name}
                src={formatProxy(
                  "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png",
                )}
                width={imageResponsiveSizeWidth()}
                height={imageResponsiveSizeHeight()}
              />
            </Link>
          </div>
          <div className="ProductListItem-ContentDescription">
            <Link className="ProductListItem-ContentTitle" to={ROUTE_PRODUCT_DETAIL}>
              {product.name}
            </Link>
          </div>
          <ul className="ProductListItem-ContentDescriptionLine">
            <li className="ProductListItem-ContentDescriptionLinePrice">
              {formatCurrency(parseInt(product.price))} ₽
            </li>
            <li className="ProductListItem-ContentTitleLine">
              <Link to={ROUTE_PRODUCT_DETAIL}>
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
            {formatCurrency(parseInt(product.price))} ₽
          </div>
          <div className="ProductListItem-FooterStatus">
            {count > 0 ? "В наличии" : "Товар отсутствует"}
          </div>
          <div className="ProductListItem-FooterAddToCartGrid">{renderButton(product)}</div>
        </div>
      </div>
    </li>
  );
});

export function productListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
