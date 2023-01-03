import { useState } from "react";
import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "~/enums";
import { useCart, useUser } from "~/hooks";
import { Button, Icon } from "~/uikit";
import { formatValueWithSpaces } from "~/utils";
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
      <h2 className="Order-Title">Оформление заказа</h2>
      <div className={clsx("Order-Inner", "Order-InnerMobile")}>
        <div className="Order-BlockLeft">
          <div className="Order-Shipping">
            <div className="Order-Inner">
              <h3 className="Order-SubTitle">Доставка курьером</h3>
              <Link className="Order-Link" to={ERoutes.Shipping}>
                Изменить
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
              <h3 className="Order-SubTitle">Товары</h3>
              <Link className="Order-Link" to={ERoutes.Cart}>
                Изменить
              </Link>
            </div>
            {cart.products.length === 0 ? (
              <p>Ваша корзина пуста.</p>
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
              <h3 className="Order-SubTitle">Получатель</h3>
              <Link className="Order-Link" to={ERoutes.Recipient}>
                Изменить
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
              <h3 className="Order-SubTitle">Итого</h3>
              <h3 className="Order-SubTitle">{formatValueWithSpaces(1000)} ₽</h3>
            </div>
            <div className="Order-Inner">
              <div>Товары - 1 шт.</div>
              <div>{formatValueWithSpaces(1200)} ₽</div>
            </div>
            <div className="Order-Inner">
              <div>Доставка</div>
              <div>{formatValueWithSpaces(300)} ₽</div>
            </div>
          </div>
          <div className="Order-Payment">
            <div className="Order-Inner">
              <div className="Order-PaymentInfo">
                {paymentMethod === CARD ? (
                  <>
                    <Icon className="Order-PaymentIcon" type="Card" />
                    <div>{CARD_TEXT}</div>
                  </>
                ) : (
                  <>
                    <Icon className="Order-PaymentIcon" type="Cash" />
                    <div>{CASH_TEXT}</div>
                  </>
                )}
              </div>
              <div className="Order-PaymentChange" onClick={handleOpenModal}>
                Изменить
              </div>
            </div>
            <Button className="Order-PaymentButton" onClick={handleSubmit}>
              Оформить заказ
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
