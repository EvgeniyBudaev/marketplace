import { useEffect, useState } from "react";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "~/enums";
import { TCartItem } from "~/shared/api/cart";
import { ETypographyVariant, IconButton, Typography } from "~/uikit";
import { createPath, formatCurrency, formatProxy } from "~/utils";
import styles from "./CartItem.module.css";
import { EFormMethods } from "~/shared/form";

type TProps = {
  cartItem: TCartItem;
  cartUuid: string;
  fetcher: FetcherWithComponents<any>;
};

export const CartItem: FC<TProps> = ({ cartItem, cartUuid, fetcher }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const handleDecrement = () => {
    fetcher.submit(
      { productAlias: cartItem.product.alias, type: "decrement", uuid: cartUuid },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      },
    );
  };

  const handleIncrement = () => {
    fetcher.submit(
      { productAlias: cartItem.product.alias, type: "increment", uuid: cartUuid },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      },
    );
  };

  const validate = (value: string) => {
    const PATTERN = /[^\d.]/g;
    return value.replace(PATTERN, "");
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = validate(event.target.value);
    setQuantity(Number(quantity));
  };

  const handleBlurQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    fetcher.submit(
      {
        newQuantity: quantity.toString(),
        productAlias: cartItem.product.alias,
        type: "setQuantity",
        uuid: cartUuid,
      },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      },
    );
  };

  const handleKeyDownQuantity = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetcher.submit(
        {
          newQuantity: quantity.toString(),
          productAlias: cartItem.product.alias,
          type: "setQuantity",
          uuid: cartUuid,
        },
        {
          method: EFormMethods.Post,
          action: createPath({
            route: ERoutes.Cart,
          }),
        },
      );
    }
  };

  const handleDelete = () => {
    fetcher.submit(
      { productAlias: cartItem.product.alias, type: "remove", uuid: cartUuid },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      },
    );
  };

  return (
    <div className="CartItem">
      <div className="CartItem-Product">
        <img
          className="CartItem-ProductImage"
          src={formatProxy(
            "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi",
          )}
          alt={cartItem.product.name}
        />
        <div className="CartItem-ProductContent">
          <div className="CartItem-ProductHeader">
            <div className="CartItem-ProductTitle">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {cartItem.product.name}
              </Typography>
            </div>
            <div className="CartItem-ProductActions">
              <div className="CartItem-ProductCounter">
                <button
                  className={clsx("CartItem-ProductCounterMinus", {
                    "CartItem-ProductCounter__disabled": cartItem.quantity <= 1,
                  })}
                  onClick={handleDecrement}
                >
                  <Typography variant={ETypographyVariant.TextH5Bold}>-</Typography>
                </button>
                <input
                  className="CartItem-ProductCounterCount"
                  type="text"
                  value={quantity}
                  onBlur={handleBlurQuantity}
                  onChange={handleChangeQuantity}
                  onKeyDown={handleKeyDownQuantity}
                />
                <button
                  className={clsx("CartItem-ProductCounterPlus", {
                    "CartItem-ProductCounter__disabled":
                      cartItem.quantity > Number(cartItem.product.count),
                  })}
                  onClick={handleIncrement}
                >
                  <Typography variant={ETypographyVariant.TextH5Bold}>+</Typography>
                </button>
              </div>
              <div className="CartItem-ProductItemPrice">
                <Typography variant={ETypographyVariant.TextB3Bold}>
                  {formatCurrency(parseInt(cartItem.product.price))} ₽/шт
                </Typography>
              </div>
            </div>
            <div className="CartItem-ProductItemTotalPrice">
              <Typography variant={ETypographyVariant.TextB2Bold}>
                {formatCurrency(cartItem.quantity * parseInt(cartItem.product.price))} ₽
              </Typography>
            </div>
          </div>
          <div className="CartItem-ProductControls">
            <IconButton
              className="CartItem-ProductDeleteMobile"
              typeIcon="Trash"
              onClick={handleDelete}
            />
            <div className="CartItem-ProductDelete" onClick={handleDelete}>
              <Typography variant={ETypographyVariant.TextB3Regular}>Удалить</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function cartItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
