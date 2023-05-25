import type { FC } from "react";
import { Link } from "@remix-run/react";
import isNil from "lodash/isNil";
import { DEFAULT_IMAGE } from "~/constants";
import type { TCartItem } from "~/shared/api/cart";
import { formatCurrency, formatProxy } from "~/utils";
import styles from "./OrderProductListItem.css";

type TProps = {
  cartItem: TCartItem;
};

export const OrderProductListItem: FC<TProps> = ({ cartItem }) => {
  const imageProduct = formatProxy(
    !isNil(cartItem?.product.images) ? cartItem.product.images[0] : DEFAULT_IMAGE,
  );

  return (
    <div className="OrderProductListItem">
      <div className="OrderProductListItem-Info">
        <Link
          className="OrderProductListItem-Link"
          to={`/${cartItem.product.catalogAlias}/${cartItem.product.alias}`}
        >
          <img
            className="OrderProductListItem-Image"
            src={imageProduct}
            alt={cartItem.product.name}
          />
        </Link>
        <span className="OrderProductListItem-Title">{cartItem.product.name}</span>
      </div>
      <div className="OrderProductListItem-Price">
        {cartItem.quantity} x {formatCurrency(Number(cartItem.product.price).toFixed())} ={" "}
        {formatCurrency(cartItem.quantity * Number(cartItem.product.price))} ₽
      </div>
    </div>
  );
};

export function orderProductListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
