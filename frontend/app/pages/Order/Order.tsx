import clsx from "clsx";
import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderCart, orderCartLinks } from "~/pages/Order/OrderCart";
import { OrderRecipient, orderRecipientLinks } from "~/pages/Order/OrderRecipient";
import { orderProductListItemLinks } from "~/pages/Order/OrderProductListItem";
import { OrderShipping, orderShippingLinks } from "~/pages/Order/OrderShipping";
import { OrderTotal, orderTotalLinks } from "~/pages/Order/OrderTotal";
import type { TCart } from "~/shared/api/cart";
import type { TRecipient } from "~/shared/api/recipient";
import type { TShipping } from "~/shared/api/shipping";
import type { TDomainErrors } from "~/types";
import { Button, ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./Order.css";

type TProps = {
  cart?: TCart;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  recipient?: TRecipient;
  shipping?: TShipping;
  success: boolean;
  uuid: string;
};

export const Order: FC<TProps> = (props) => {
  const { cart, recipient, shipping, uuid } = props;
  const { t } = useTranslation();
  const CARD = "card";
  const CASH = "cash";
  const CARD_TEXT = t("pages.order.payWithCard");
  const CASH_TEXT = t("pages.order.payWithCash");
  const [paymentMethod, setPaymentMethod] = useState(CARD);

  const handleOpenModal = () => {};

  const handleSubmit = () => {};

  return (
    <section className="Order">
      <h1 className="Order-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>{t("pages.order.title")}</Typography>
      </h1>
      <div className={clsx("Order-Inner", "Order-InnerMobile")}>
        <div className="Order-BlockLeft">
          <OrderShipping shipping={shipping} />
          <OrderCart cart={cart} />
          <OrderRecipient recipient={recipient} />
        </div>
        <div className="Order-BlockRight">
          <OrderTotal cart={cart} />

          <div className="Order-Payment">
            <div className="Order-Inner">
              <div className="Order-PaymentInfo">
                {paymentMethod === CARD ? (
                  <>
                    <Icon className="Order-PaymentIcon" type="Card" />
                    <div>
                      <Typography variant={ETypographyVariant.TextB3Regular}>
                        {CARD_TEXT}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon className="Order-PaymentIcon" type="Cash" />
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
  return [
    { rel: "stylesheet", href: styles },
    ...orderProductListItemLinks(),
    ...orderShippingLinks(),
    ...orderRecipientLinks(),
    ...orderCartLinks(),
    ...orderTotalLinks(),
  ];
}
