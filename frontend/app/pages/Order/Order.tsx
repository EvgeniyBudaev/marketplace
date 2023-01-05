import { useState } from "react";
import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "~/enums";
import { useCart, useUser } from "~/hooks";
import { Button, ETypographyVariant, Icon, Typography } from "~/uikit";
import { formatCurrency } from "~/utils";
import styles from "./Order.module.css";

export const Order: FC = () => {
  const CARD = "card";
  const CASH = "cash";
  const CARD_TEXT = "Картой при получении";
  const CASH_TEXT = "Наличными при получении";
  const { cart } = useCart();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState(CARD);

  const handleOpenModal = () => {};

  const handleSubmit = () => {};

  return (
    <section className="Order">
      <h1 className="Order-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Оформление заказа</Typography>
      </h1>
      <div className={clsx("Order-Inner", "Order-InnerMobile")}>
        <div className="Order-BlockLeft">
          <div className="Order-Shipping">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>Доставка курьером</Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Shipping}>
                <Typography variant={ETypographyVariant.TextB3Regular}>Изменить</Typography>
              </Link>
            </div>
            <div className="Order-Address">
              <Icon className="Order-AddressIcon" type="House" />
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
                <Typography variant={ETypographyVariant.TextH5Bold}>Товары</Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Cart}>
                <Typography variant={ETypographyVariant.TextB3Regular}>Изменить</Typography>
              </Link>
            </div>
            {cart.products.length === 0 ? (
              <p>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  Ваша корзина пуста.
                </Typography>
              </p>
            ) : (
              <div>
                {/*{cart.products.map(item => (*/}
                {/*        <OrderProductsItem key={item.id} item={item} />*/}
                {/*    ))}*/}
              </div>
            )}
          </div>
          <div className="Order-Recipient">
            <div className="Order-Inner">
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>Получатель</Typography>
              </h5>
              <Link className="Order-Link" to={ERoutes.Recipient}>
                <Typography variant={ETypographyVariant.TextB3Regular}>Изменить</Typography>
              </Link>
            </div>
            <div className="Order-RecipientInfo">
              <Icon className="Order-RecipientInfoIcon" type="User" />
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
                  <> , </>
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
                <Typography variant={ETypographyVariant.TextH5Bold}>Итого</Typography>
              </h5>
              <h5 className="Order-SubTitle">
                <Typography variant={ETypographyVariant.TextH5Bold}>
                  {formatCurrency(1000)} ₽
                </Typography>
              </h5>
            </div>
            <div className="Order-Inner">
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>Товары - 1 шт.</Typography>
              </div>
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {formatCurrency(1200)} ₽
                </Typography>
              </div>
            </div>
            <div className="Order-Inner">
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>Доставка</Typography>
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
                <Typography variant={ETypographyVariant.TextB3Regular}>Изменить</Typography>
              </div>
            </div>
            <Button className="Order-PaymentButton" onClick={handleSubmit}>
              <Typography variant={ETypographyVariant.TextB3Regular}>Оформить заказ</Typography>
            </Button>
          </div>
        </div>
      </div>
      <div className="Order-Controls"></div>
    </section>
  );
};

export function orderLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
