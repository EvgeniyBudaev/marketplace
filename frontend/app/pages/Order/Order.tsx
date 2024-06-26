import clsx from "clsx";
import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import { useAuthenticityToken } from "remix-utils/csrf/react";

import { ERoutes } from "#app/enums";
import { EPaymentMethod } from "#app/pages/Order/enums";
import { ModalPaymentMethod } from "#app/pages/Order/ModalPaymentMethod";
import { OrderCart, orderCartLinks } from "#app/pages/Order/OrderCart";
import { OrderPayment, orderPaymentLinks } from "#app/pages/Order/OrderPayment";
import {
  OrderRecipient,
  orderRecipientLinks,
} from "#app/pages/Order/OrderRecipient";
import { orderProductListItemLinks } from "#app/pages/Order/OrderProductListItem";
import {
  OrderShipping,
  orderShippingLinks,
} from "#app/pages/Order/OrderShipping";
import { OrderTotal, orderTotalLinks } from "#app/pages/Order/OrderTotal";
import type { TCart } from "#app/shared/api/cart";
import type { TRecipient } from "#app/shared/api/recipient";
import type { TShipping } from "#app/shared/api/shipping";
import { EFormMethods } from "#app/shared/form";
import type { TDomainErrors } from "#app/types";
import { ETypographyVariant, Typography } from "#app/uikit";
import { createPath } from "#app/utils";
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
  const { cart, recipient, shipping, uuid } = props;
  const csrf = useAuthenticityToken();
  const fetcher = useFetcher();
  const { t } = useTranslation();
  const [isOpenModalPaymentMethod, setIsOpenModalPaymentMethod] =
    useState(false);
  const [payment, setPayment] = useState(EPaymentMethod.CARD);

  const handleOpenModalPaymentMethod = () => {
    setIsOpenModalPaymentMethod((prevState: boolean) =>
      prevState ? prevState : true
    );
  };

  const handleCloseModalPaymentMethod = () => {
    setIsOpenModalPaymentMethod((prevState: boolean) =>
      prevState ? false : prevState
    );
  };

  const handleModalPaymentSubmit = (value: EPaymentMethod) => {
    setPayment(value);
    handleCloseModalPaymentMethod();
  };

  const handleOrderSubmit = () => {
    const formattedParams = { paymentVariantId: payment, csrf, uuid };
    fetcher.submit(
      { ...formattedParams },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Order,
          withIndex: true,
        }),
      }
    );
  };

  return (
    <section className="Order">
      <h1 className="Order-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.order.title")}
        </Typography>
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
            paymentMethod={payment}
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
