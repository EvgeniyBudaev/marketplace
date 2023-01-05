import { useState } from "react";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import clsx from "clsx";
import { useCart } from "~/hooks";
import type { TCartItem } from "~/shared/api/cart";
import { ETypographyVariant, IconButton, Typography } from "~/uikit";
import { formatCurrency, formatProxy } from "~/utils";
import styles from "./CartItem.module.css";

type TProps = {
  cartItem: TCartItem;
};

export const CartItem: FC<TProps> = ({ cartItem }) => {
  const { onChangeCartItem, onDeleteCartItem } = useCart();
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleDecrement = () => {
    if (cartItem.quantity <= 1) return;
    onChangeCartItem({
      payload: {
        ...cartItem,
        id: cartItem.product.id,
        quantity: cartItem.quantity - 1,
      },
    }).then((_) => true);
  };

  const handleIncrement = () => {
    if (cartItem.quantity > Number(cartItem.product.count)) return;
    onChangeCartItem({
      payload: {
        ...cartItem,
        id: cartItem.product.id,
        quantity: cartItem.quantity + 1,
      },
    }).then((_) => true);
  };

  const validate = (value: string) => {
    const PATTERN = /\D/g;
    return value.replace(PATTERN, "");
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(validate(event.target.value));
    setQuantity(Number(event.target.value));
    onChangeCartItem({
      payload: {
        ...cartItem,
        id: cartItem.product.id,
        quantity,
      },
    }).then((_) => true);
  };

  const handleBlurQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(validate(event.target.value));
    onChangeCartItem({
      payload: {
        ...cartItem,
        id: cartItem.product.id,
        quantity,
      },
    }).then((_) => true);
  };

  const handleKeyPressQuantity = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onChangeCartItem({
        payload: {
          ...cartItem,
          id: cartItem.product.id,
          quantity,
        },
      }).then((_) => true);
    }
  };

  const handleDelete = () => {
    onDeleteCartItem({
      payload: {
        id: cartItem.product.id,
      },
    }).then((_) => true);
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
                  value={cartItem.quantity}
                  onBlur={handleBlurQuantity}
                  onChange={handleChangeQuantity}
                  onKeyPress={handleKeyPressQuantity}
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
