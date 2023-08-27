import isNil from "lodash/isNil";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { ERoutes } from "~/enums";
import type { TShipping } from "~/shared/api/shipping";
import { ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./OrderShipping.css";
import { createPath } from "~/utils";

type TProps = {
  shipping?: TShipping;
};

export const OrderShipping: FC<TProps> = ({ shipping }) => {
  const { t } = useTranslation();

  return (
    <div className="OrderShipping">
      <div className="OrderShipping-Inner">
        <h5 className="OrderShipping-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>
            {t("pages.order.courierDelivery")}
          </Typography>
        </h5>
        <Link
          className="OrderShipping-Link"
          to={createPath({
            route: ERoutes.Shipping,
          })}
        >
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.change")}
          </Typography>
        </Link>
      </div>
      <div className="OrderShipping-Address">
        <Icon className="OrderShipping-AddressIcon" type="House" />
        <div className="OrderShippingAddressInfo">
          <div className="OrderShipping-AddressInfoTitle">{shipping?.address ?? ""}</div>
          <div className="OrderShipping-AddressInfoSubTitle">
            <div>{!isNil(shipping?.flat) && `${t("form.apartment.title")}: ${shipping?.flat}`}</div>
            <div>{!isNil(shipping?.floor) && `${t("form.floor.title")}: ${shipping?.floor}`}</div>
            <div>{!isNil(shipping?.comment) && `${t("form.commentForCourier.title")}: ${shipping?.comment}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function orderShippingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
