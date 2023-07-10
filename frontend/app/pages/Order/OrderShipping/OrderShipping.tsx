import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./OrderShipping.css";

export const OrderShipping: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="OrderShipping">
      <div className="OrderShipping-Inner">
        <h5 className="OrderShipping-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>
            {t("pages.order.courierDelivery")}
          </Typography>
        </h5>
        <Link className="OrderShipping-Link" to={ERoutes.Shipping}>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.change")}
          </Typography>
        </Link>
      </div>
      <div className="OrderShipping-Address">
        <Icon className="OrderShipping-AddressIcon" type="House" />
        <div className="OrderShippingAddressInfo">
          {/*<div className="OrderShipping-AddressInfoTitle">*/}
          {/*    {shippingAddress && shippingAddress.address}*/}
          {/*</div>*/}
          {/*<div className="OrderShipping-AddressInfoSubTitle">*/}
          {/*    {shippingAddress &&*/}
          {/*        (shippingAddress.apartment*/}
          {/*            ? "квартира: " + shippingAddress.apartment*/}
          {/*            : null)}*/}
          {/*    <> </>*/}
          {/*    {shippingAddress &&*/}
          {/*        (shippingAddress.entrance*/}
          {/*            ? "подъезд: " + shippingAddress.entrance*/}
          {/*            : null)}*/}
          {/*    <> </>*/}
          {/*    {shippingAddress &&*/}
          {/*        (shippingAddress.floor*/}
          {/*            ? "этаж: " + shippingAddress.floor*/}
          {/*            : null)}*/}
          {/*    <> </>*/}
          {/*    {shippingAddress &&*/}
          {/*        (shippingAddress.floor*/}
          {/*            ? "домофон: " + shippingAddress.intercom*/}
          {/*            : null)}*/}
          {/*    <> </>*/}
          {/*    {shippingAddress &&*/}
          {/*        shippingAddress.comment &&*/}
          {/*        "комментарий: " + shippingAddress.comment}*/}
          {/*    <> </>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export function orderShippingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
