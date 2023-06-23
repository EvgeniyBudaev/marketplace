import {useState} from "react";
import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "@remix-run/react";
import clsx from "clsx";
import isNil from "lodash/isNil";

import {ERoutes} from "~/enums";
import {useUser} from "~/hooks";
import type {TCart} from "~/shared/api/cart";
import {Button, ETypographyVariant, Icon, Typography} from "~/uikit";
import {formatCurrency} from "~/utils";

import {
  OrderProductListItem,
  orderProductListItemLinks,
} from "~/pages/Order/OrderProductListItem";
import styles from "./Order.css";

type TProps = {
  cart: TCart;
};

export const Order: FC<TProps> = ({cart}) => {
  const {t} = useTranslation();
  const CARD = "card";
  const CASH = "cash";
  const CARD_TEXT = t("pages.order.payWithCard");
  const CASH_TEXT = t("pages.order.payWithCash");
  const {user} = useUser();
  const [paymentMethod, setPaymentMethod] = useState(CARD);

  const handleOpenModal = () => {
  };

  const handleSubmit = () => {
  };

  return (
    <section className="Order">
      <h1 className="Order-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>{t("pages.order.title")}</Typography>
      </h1>
      <div className={clsx("Order-Inner", "Order-InnerMobile")}>
        <div className="Order-BlockLeft">
          <div className="Order-Shipping">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {t("pages.order.courierDelivery")}
                </Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Shipping}>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("common.actions.change")}
                </Typography>
              </Link>
            </div>
            <div className="Order-Address">
              <Icon className="Order-AddressIcon" type="House"/>
              <div className="Order-AddressInfo">
                {/*<div className="Order-AddressInfoTitle">*/}
                {/*    {shippingAddress && shippingAddress.address}*/}
                {/*</div>*/}
                {/*<div className="Order-AddressInfoSubTitle">*/}
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
          <div className="Order-Products">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {t("pages.order.goods")}
                </Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Cart}>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("common.actions.change")}
                </Typography>
              </Link>
            </div>
            {isNil(cart.items) ? (
              <p>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("pages.order.cartEmpty")}
                </Typography>
              </p>
            ) : (
              <div>
                {cart.items.map((item) => (
                  <OrderProductListItem key={item.id} cartItem={item}/>
                ))}
              </div>
            )}
          </div>
          <div className="Order-Recipient">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {t("pages.order.recipient")}
                </Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Recipient}>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("common.actions.change")}
                </Typography>
              </Link>
            </div>
            <div className="Order-RecipientInfo">
              <Icon className="Order-RecipientInfoIcon" type="User"/>
              <div className="Order-RecipientInfoText">
                <div className="Order-RecipientInfoTitle">
                  {/*{user*/}
                  {/*    ? user.lastName*/}
                  {/*    : order_user && order_user.lastName}*/}
                  {/*<> </>*/}
                  {/*{user*/}
                  {/*    ? user.firstName*/}
                  {/*    : order_user && order_user.firstName}*/}
                </div>
                <div className="Order-RecipientInfoSubTitle">
                  email: {/*{user*/}
                  {/*    ? user.email*/}
                  {/*    : order_user && order_user.email}*/}
                  <> ,</>
                  моб.: {/*{user*/}
                  {/*    ? user.phone*/}
                  {/*    : order_user && order_user.phone}*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Order-BlockRight">
          <div className="Order-Total">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {t("common.info.total")}
                </Typography>
              </h5>
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {formatCurrency(1000)} ₽
                </Typography>
              </h5>
            </div>
            <div className="Order-Inner">
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("pages.order.goods")} - 1 шт.
                </Typography>
              </div>
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {formatCurrency(1200)} ₽
                </Typography>
              </div>
            </div>
            <div className="Order-Inner">
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("pages.order.delivery")}
                </Typography>
              </div>
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {formatCurrency(300)} ₽
                </Typography>
              </div>
            </div>
          </div>
          <div className="Order-Payment">
            <div className="Order-Inner">
              <div className="Order-PaymentInfo">
                {paymentMethod === CARD ? (
                  <>
                    <Icon className="Order-PaymentIcon" type="Card"/>
                    <div>
                      <Typography variant={ETypographyVariant.TextB3Regular}>
                        {CARD_TEXT}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon className="Order-PaymentIcon" type="Cash"/>
                    <div>
                      <Typography variant={ETypographyVariant.TextB3Regular}>
                        {CASH_TEXT}
                      </Typography>
                    </div>
                  </>
                )}
              </div>
              <div className="Order-PaymentChange" onClick={handleOpenModal}>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("common.actions.change")}
                </Typography>
              </div>
            </div>
            <Button className="Order-PaymentButton" onClick={handleSubmit}>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.order.checkout")}
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <div className="Order-Controls"></div>
    </section>
  );
};

export function orderLinks() {
  return [{rel: "stylesheet", href: styles}, ...orderProductListItemLinks()];
}
