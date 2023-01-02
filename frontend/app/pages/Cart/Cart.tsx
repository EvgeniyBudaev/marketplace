import type { FC } from "react";
import { Link, useNavigate } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import { ERoutes } from "~/enums";
import { useCart } from "~/hooks";
import { Button, Icon } from "~/uikit";
import { formatValueWithSpaces } from "~/utils";
import { CartItem, cartItemLinks } from "./CartItem";
import styles from "./Cart.module.css";

export const Cart: FC = () => {
  const isAuthenticated = true;
  const { cart } = useCart();
  console.log("Cart cart: ", cart);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate(ERoutes.Shipping);
  };

  return (
    <section className="Cart">
      <h1 className="Cart-Title">Моя корзина</h1>
      <div className="Cart-Inner">
        <div className="Cart-List">
          {!isEmpty(cart.products) ? (
            cart.products.map((cartItem) => (
              <CartItem key={cartItem.product.id} cartItem={cartItem} />
            ))
          ) : (
            <div>В корзине нет товаров</div>
          )}
        </div>
        <div className="Cart-Checkout">
          <div className="Cart-CheckoutInner">
            <div className="Cart-OrdersList">
              <div className="Cart-CostLine">
                <div className="Cart-CostLineText">
                  В корзине 2<> </>
                  товара
                </div>
                <div className="Cart-CostLinePrice">
                  <div className="Cart-CostLineSubTotalPrice">
                    {formatValueWithSpaces(parseInt("1500"))}&nbsp;₽
                  </div>
                  <div className="Cart-CostLinePriceWithDiscount">
                    {formatValueWithSpaces(parseInt("1000"))}&nbsp;₽
                  </div>
                </div>
              </div>
              <Button
                className="Cart-ButtonGoToOrder"
                isDisabled={false}
                onClick={handleProceedToCheckout}
              >
                Перейти к оформлению
              </Button>
            </div>
            {isAuthenticated ? (
              <div className="Cart-OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconLogoShort" type="LogoShort" />
                  <div>
                    <span>
                      - {formatValueWithSpaces(parseInt("500"))}
                      <> </>
                    </span>
                    <span>рублей за заказ</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconEnter" type="Enter" />
                  <Link className="Cart-TextEnter" to={ERoutes.Login}>
                    Авторизуйтесь/зарегистрируйтесь, чтобы получить 3% от стоимости заказа
                  </Link>
                </div>
              </div>
            )}
            <div className="Cart-BackToShopping" onClick={() => {}}>
              Вернуться к покупкам
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
