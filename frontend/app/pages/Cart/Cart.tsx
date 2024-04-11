import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "@remix-run/react";
import isNil from "lodash/isNil.js";
import { ERoutes } from "#app/enums";
import type { TCart, TCartItem } from "#app/shared/api/cart";
import { Button, ETypographyVariant, Typography } from "#app/uikit";
import { formatCurrency } from "#app/utils";
import { CartItem, cartItemLinks } from "./CartItem";
import styles from "./Cart.css";

type TProps = {
  cart: TCart;
};

export const Cart: FC<TProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const cart = fetcher.data ?? (props.cart as TCart);
  // console.log("cart: ", cart);

  const handleProceedToCheckout = () => {
    navigate(ERoutes.Shipping);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="Cart">
      <h1 className="Cart-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.cart.title")}
        </Typography>
      </h1>
      <div className="Cart-Inner">
        <div className="Cart-List">
          {cart && !isNil(cart.items) ? (
            cart.items.map((cartItem: TCartItem) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                cartUuid={cart.uuid}
                fetcher={fetcher}
              />
            ))
          ) : (
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("pages.cart.noItemInCart")}
            </Typography>
          )}
        </div>
        <div className="Cart-Checkout">
          <div className="Cart-CheckoutInner">
            <div className="Cart-OrdersList">
              <div className="Cart-CostLine">
                <div className="Cart-CostLineText">
                  <Typography variant={ETypographyVariant.TextB3Regular}>
                    {t("common.info.inCart")} <> </>
                    {t("pages.cart.products", { items: cart.countProducts })}
                  </Typography>
                </div>
                <div className="Cart-CostLinePrice">
                  {/* <div className="Cart-CostLineSubTotalPrice">
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      {formatCurrency(parseInt("1500"))}&nbsp;₽
                    </Typography>
                  </div> */}
                  <div className="Cart-CostLinePriceWithDiscount">
                    <Typography variant={ETypographyVariant.TextH5Bold}>
                      {formatCurrency(parseInt(cart.cartAmount))}&nbsp;₽
                    </Typography>
                  </div>
                </div>
              </div>
              <Button
                className="Cart-ButtonGoToOrder"
                isDisabled={isNil(cart.items)}
                onClick={handleProceedToCheckout}
              >
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("pages.cart.goToCheckout")}
                </Typography>
              </Button>
            </div>
            {/* {isAuthenticated ? (
              <div className="Cart-OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconLogoShort" type="LogoShort"/>
                  <div>
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      - {formatCurrency(parseInt("500"))}
                      <> </>
                      {t("pages.cart.rublesPerOrder")}
                    </Typography>
                  </div>
                </div>
              </div>
            ) : (
              <div className="OrdersList">
                <div className="Cart-Inner">
                  <Icon className="Cart-IconEnter" type="Enter"/>
                  <Link className="Cart-TextEnter" to={ERoutes.Login}>
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      {t("pages.cart.discountForAuth")}
                    </Typography>
                  </Link>
                </div>
              </div>
            )} */}
            <div className="Cart-BackToShopping" onClick={handleGoBack}>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.cart.backToShopping")}
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
