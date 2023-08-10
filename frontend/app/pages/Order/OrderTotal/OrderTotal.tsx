import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { TCart } from "~/shared/api/cart";
import { ETypographyVariant, Typography } from "~/uikit";
import { formatCurrency } from "~/utils";
import styles from "./OrderTotal.css";

type TProps = {
  cart?: TCart;
};

export const OrderTotal: FC<TProps> = ({ cart }) => {
  const { t } = useTranslation();

  return (
    <div className="OrderTotal">
      <div className="OrderTotal-Inner">
        <h5 className="OrderTotal-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>{t("common.info.total")}</Typography>
        </h5>
        <h5 className="OrderTotal-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>
            {formatCurrency(cart?.cartAmount ?? "-")} ₽
          </Typography>
        </h5>
      </div>
      <div className="OrderTotal-Inner">
        <div>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("pages.order.goods")} - {cart?.countProducts} шт.
          </Typography>
        </div>
        <div>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {formatCurrency(cart?.cartAmount ?? "-")} ₽
          </Typography>
        </div>
      </div>
      {/*<div className="OrderTotal-Inner">*/}
      {/*  <div>*/}
      {/*    <Typography variant={ETypographyVariant.TextB3Regular}>*/}
      {/*      {t("pages.order.delivery")}*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <Typography variant={ETypographyVariant.TextB3Regular}>*/}
      {/*      {formatCurrency(DELIVERY_PRICE)} ₽*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export function orderTotalLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
