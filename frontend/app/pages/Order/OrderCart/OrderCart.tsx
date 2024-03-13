import isNil from "lodash/isNil.js";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { OrderProductListItem } from "~/pages/Order/OrderProductListItem";
import type { TCart } from "~/shared/api/cart";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./OrderCart.css";
import { createPath } from "~/utils";

type TProps = {
  cart?: TCart;
};

export const OrderCart: FC<TProps> = ({ cart }) => {
  const { t } = useTranslation();

  return (
    <div className="OrderCart">
      <div className="OrderCart-Inner">
        <h5 className="OrderCart-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>{t("pages.order.goods")}</Typography>
        </h5>
        <Link
          className="OrderCart-Link"
          to={createPath({
            route: ERoutes.Cart,
          })}
        >
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.change")}
          </Typography>
        </Link>
      </div>
      {isNil(cart?.items) ? (
        <p>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("pages.order.cartEmpty")}
          </Typography>
        </p>
      ) : (
        <div>
          {cart?.items.map((item) => (
            <OrderProductListItem key={item.id} cartItem={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export function orderCartLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
