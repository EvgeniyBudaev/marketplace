import { useEffect, useState } from "react";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Link } from "@remix-run/react";
import type { FetcherWithComponents } from "@remix-run/react";
import clsx from "clsx";
import isNil from "lodash/isNil.js";
import { ERoutes } from "#app/enums";
import { useProxyUrl } from "#app/hooks";
import type { TCartItem } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";
import { ETypographyVariant, Icon, IconButton, Typography } from "#app/uikit";
import { createPath, formatCurrency } from "#app/utils";
import styles from "./CartItem.css";

type TProps = {
  cartItem: TCartItem;
  cartUuid: string;
  fetcher: FetcherWithComponents<any>;
};

export const CartItem: FC<TProps> = ({ cartItem, cartUuid, fetcher }) => {
  const { proxyUrl } = useProxyUrl();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 500px)" });
  // console.log("cartItem: ", cartItem);

  const imageResponsiveSizeWidth = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 200;
    }
  };

  const imageResponsiveSizeHeight = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 200;
    }
  };

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const handleDecrement = () => {
    fetcher.submit(
      {
        productAlias: cartItem.product.alias,
        type: "decrement",
        uuid: cartUuid,
      },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      }
    );
  };

  const handleIncrement = () => {
    fetcher.submit(
      {
        productAlias: cartItem.product.alias,
        type: "increment",
        uuid: cartUuid,
      },
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.Cart,
        }),
      }
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
      }
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
        }
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
      }
    );
  };

  return (
    <div className="CartItem">
      <div className="CartItem-Product">
        <div
          className={clsx("CartItem-ProductContentContainerImage", {
            no_image: isNil(cartItem.product.defaultImage),
          })}
        >
          <Link
            className="CartItem-ProductContentLink"
            to={createPath({
              route: ERoutes.ProductDetail,
              params: {
                aliasCatalog: cartItem.product.catalogAlias,
                aliasProduct: cartItem.product.alias,
              },
            })}
          >
            {!isNil(cartItem.product.defaultImage) ? (
              <img
                className="CartItem-ProductContentImage"
                alt={cartItem.product.name}
                src={`${proxyUrl}${cartItem.product.defaultImage}`}
                width={imageResponsiveSizeWidth()}
                height={imageResponsiveSizeHeight()}
              />
            ) : (
              <Icon className="CartItem-ProductContentImage" type="NoImage" />
            )}
          </Link>
        </div>

        <div className="CartItem-ProductCommon">
          <div className="CartItem-ProductInfo">
            <div className="CartItem-ProductContent">
              <div className="CartItem-ProductTitle">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {cartItem.product.name}
                </Typography>
              </div>
            </div>

            <div className="CartItem-ProductControls">
              <div className="CartItem-ProductActions">
                <div className="CartItem-ProductCounter">
                  <button
                    className={clsx("CartItem-ProductCounterMinus", {
                      "CartItem-ProductCounter__disabled":
                        cartItem.quantity <= 1,
                    })}
                    onClick={handleDecrement}
                  >
                    <Typography variant={ETypographyVariant.TextH5Bold}>
                      -
                    </Typography>
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
                    <Typography variant={ETypographyVariant.TextH5Bold}>
                      +
                    </Typography>
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
                  {formatCurrency(
                    cartItem.quantity * parseInt(cartItem.product.price)
                  )}{" "}
                  ₽
                </Typography>
              </div>
              <IconButton
                className="CartItem-ProductDeleteMobile"
                typeIcon="Trash"
                onClick={handleDelete}
              />
            </div>
          </div>

          <div className="CartItem-ProductDelete" onClick={handleDelete}>
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("common.actions.delete")}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export function cartItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
