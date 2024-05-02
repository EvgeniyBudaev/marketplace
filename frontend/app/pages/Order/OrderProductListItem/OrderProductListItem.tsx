import isNil from "lodash/isNil";
import type { FC } from "react";
import { Link } from "@remix-run/react";
import { DEFAULT_IMAGE } from "#app/constants";
import { ERoutes } from "#app/enums";
import { useProxyUrl } from "#app/hooks";
import type { TCartItem } from "#app/shared/api/cart";
import { createPath, formatCurrency } from "#app/utils";
import styles from "./OrderProductListItem.css";

type TProps = {
  cartItem: TCartItem;
};

export const OrderProductListItem: FC<TProps> = ({ cartItem }) => {
  const { proxyUrl } = useProxyUrl();

  const imageProduct = !isNil(cartItem?.product.defaultImage)
    ? `${proxyUrl}${cartItem.product.defaultImage}`
    : `${proxyUrl}${DEFAULT_IMAGE}`;

  return (
    <div className="OrderProductListItem">
      <div className="OrderProductListItem-Info">
        <Link
          className="OrderProductListItem-Link"
          to={createPath({
            route: ERoutes.ProductDetail,
            params: {
              aliasCatalog: cartItem.product.catalogAlias,
              aliasProduct: cartItem.product.alias,
            },
          })}
        >
          <img
            className="OrderProductListItem-Image"
            src={imageProduct}
            alt={cartItem.product.name}
          />
        </Link>
        <span className="OrderProductListItem-Title">
          {cartItem.product.name}
        </span>
      </div>
      <div className="OrderProductListItem-Price">
        {cartItem.quantity} x {formatCurrency(parseInt(cartItem.product.price))}{" "}
        = {formatCurrency(cartItem.quantity * parseInt(cartItem.product.price))}{" "}
        ₽
      </div>
    </div>
  );
};

export function orderProductListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
