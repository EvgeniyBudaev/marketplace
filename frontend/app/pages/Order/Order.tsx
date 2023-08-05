import clsx from "clsx";
import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { EPaymentMethod } from "~/pages/Order/enums";
import { ModalPaymentMethod } from "~/pages/Order/ModalPaymentMethod";
import { OrderCart, orderCartLinks } from "~/pages/Order/OrderCart";
import { OrderPayment, orderPaymentLinks } from "~/pages/Order/OrderPayment";
import { OrderRecipient, orderRecipientLinks } from "~/pages/Order/OrderRecipient";
import { orderProductListItemLinks } from "~/pages/Order/OrderProductListItem";
import { OrderShipping, orderShippingLinks } from "~/pages/Order/OrderShipping";
import { OrderTotal, orderTotalLinks } from "~/pages/Order/OrderTotal";
import type { TCart } from "~/shared/api/cart";
import type { TRecipient } from "~/shared/api/recipient";
import type { TShipping } from "~/shared/api/shipping";
import type { TDomainErrors } from "~/types";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Order.css";

type TProps = {
  cart: TCart;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  recipient: TRecipient;
  shipping: TShipping;
  success?: boolean;
  uuid: string;
};

export const Order: FC<TProps> = (props) => {
  const { cart, recipient, shipping } = props;
  const { t } = useTranslation();
  const [isOpenModalPaymentMethod, setIsOpenModalPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(EPaymentMethod.CARD);

  const handleOpenModalPaymentMethod = () => {
    setIsOpenModalPaymentMethod((prevState: boolean) => (prevState ? prevState : true));
  };

  const handleCloseModalPaymentMethod = () => {
    setIsOpenModalPaymentMethod((prevState: boolean) => (prevState ? false : prevState));
  };

  const handleModalPaymentSubmit = (value: EPaymentMethod) => {
    setPaymentMethod(value);
    handleCloseModalPaymentMethod();
  };

  const handleOrderSubmit = () => {
    console.log("paymentMethod: ", paymentMethod);
  };

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
          <OrderPayment
            onOpenModalPaymentMethod={handleOpenModalPaymentMethod}
            onSubmit={handleOrderSubmit}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
      <div className="Order-Controls"></div>
      <ModalPaymentMethod
        isOpen={isOpenModalPaymentMethod}
        onClose={handleCloseModalPaymentMethod}
        onSubmit={handleModalPaymentSubmit}
      />
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
    ...orderPaymentLinks(),
  ];
}
