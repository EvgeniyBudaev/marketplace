import type { FC } from "react";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import isNil from "lodash/isNil";
import { ERoutes } from "~/enums";
import { useCart } from "~/hooks";
import { Button, ETypographyVariant, Icon, Typography } from "~/uikit";
import { formatCurrency } from "~/utils";
import { CartItem, cartItemLinks } from "./CartItem";
import styles from "./Cart.module.css";

export const Cart: FC = () => {
  const isAuthenticated = true;
  const { cart } = useCart();
  console.log("Cart cart: ", cart);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  console.log("Cart fetcher data: ", fetcher.data);

  const handleProceedToCheckout = () => {
    navigate(ERoutes.Shipping);
  };

  return (
    <section className="Cart">
      <h1 className="Cart-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Моя корзина</Typography>
      </h1>
      <div className="Cart-Inner">
        <div className="Cart-List">
          {cart && !isNil(cart.items) ? (
            cart.items.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)
          ) : (
            <Typography variant={ETypographyVariant.TextB3Regular}>
              В корзине нет товаров
            </Typography>
          )}
        </div>
        <div className="Cart-Checkout">
          <div className="Cart-CheckoutInner">
            <div className="Cart-OrdersList">
              <div className="Cart-CostLine">
                <div className="Cart-CostLineText">
                  <Typography variant={ETypographyVariant.TextB3Regular}>
                    В корзине 2<> </>
                    товара
                  </Typography>
                </div>
                <div className="Cart-CostLinePrice">
                  <div className="Cart-CostLineSubTotalPrice">
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      {formatCurrency(parseInt("1500"))}&nbsp;₽
                    </Typography>
                  </div>
                  <div className="Cart-CostLinePriceWithDiscount">
                    <Typography variant={ETypographyVariant.TextH5Bold}>
                      {formatCurrency(parseInt("1000"))}&nbsp;₽
                    </Typography>
                  </div>
                </div>
              </div>
              <Button
                className="Cart-ButtonGoToOrder"
                isDisabled={false}
                onClick={handleProceedToCheckout}
              >
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  Перейти к оформлению
                </Typography>
              </Button>
            </div>
            {isAuthenticated ? (
              <div className="Cart-OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconLogoShort" type="LogoShort" />
                  <div>
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      - {formatCurrency(parseInt("500"))}
                      <> </>рублей за заказ
                    </Typography>
                  </div>
                </div>
              </div>
            ) : (
              <div className="OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconEnter" type="Enter" />
                  <Link className="Cart-TextEnter" to={ERoutes.Login}>
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      Авторизуйтесь/зарегистрируйтесь, чтобы получить 3% от стоимости заказа
                    </Typography>
                  </Link>
                </div>
              </div>
            )}
            <div className="Cart-BackToShopping" onClick={() => {}}>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                Вернуться к покупкам
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function cartLinks() {
  return [{ rel: "stylesheet", href: styles }, ...cartItemLinks()];
}
