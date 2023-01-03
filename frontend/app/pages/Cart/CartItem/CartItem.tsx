import { useState } from "react";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import clsx from "clsx";
import { useCart } from "~/hooks";
import type { TCartItem } from "~/shared/api/cart";
import { IconButton } from "~/uikit";
import { formatValueWithSpaces } from "~/utils";
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
          src="https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi"
          alt={cartItem.product.name}
        />
        <div className="CartItem-ProductContent">
          <div className="CartItem-ProductHeader">
            <div className="CartItem-ProductTitle">{cartItem.product.name}</div>
            <div className="CartItem-ProductActions">
              <div className="CartItem-ProductCounter">
                <button
                  className={clsx("CartItem-ProductCounterMinus", {
                    "CartItem-ProductCounter__disabled": cartItem.quantity <= 1,
                  })}
                  onClick={handleDecrement}
                >
                  -
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
                  +
                </button>
              </div>
              <div className="CartItem-ProductItemPrice">
                {formatValueWithSpaces(parseInt(cartItem.product.price))} ₽/шт
              </div>
            </div>
            <div className="CartItem-ProductItemTotalPrice">
              {formatValueWithSpaces(cartItem.quantity * parseInt(cartItem.product.price))} ₽
            </div>
          </div>
          <div className="CartItem-ProductControls">
            <IconButton
              className="CartItem-ProductDeleteMobile"
              typeIcon="Trash"
              onClick={handleDelete}
            />
            <div className="CartItem-ProductDelete" onClick={handleDelete}>
              Удалить
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
