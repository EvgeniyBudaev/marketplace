import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { ERoutes } from "~/enums";
import { useCart, useUser } from "~/hooks";
import { TCart } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";
import { Avatar, DropDown, ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./HeaderIconsList.module.css";

type TProps = {
  cart?: TCart;
  className?: string;
  isHomePage?: boolean;
};

export const HeaderIconsList: FC<TProps> = ({ cart, className, isHomePage }) => {
  const { user } = useUser();
  //console.log("HeaderIconsList cart: ", cart);
  const [cartId, setCartId] = useState("");
  const [cartItemsCountTotal, setCartItemsCountTotal] = useState(0);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refToggleDropDown = useRef<any>(null);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropDown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropDown);
    };
  });

  useEffect(() => {
    if (!isNil(cart)) {
      setCartItemsCountTotal(cart.cartAmount);
    }
  }, [cart]);

  const handleClickOutsideDropDown = (event: MouseEvent) => {
    if (isDropDownOpen) {
      if (refToggleDropDown.current) {
        if (!refToggleDropDown.current.contains(event.target)) {
          setIsDropDownOpen(false);
        }
      }
    }
  };

  const handleToggleDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    //navigate(ERoutes.Root);
    fetcher.submit(
      {},
      {
        method: EFormMethods.Post,
        action: ERoutes.ResourcesLogout,
      },
    );
  };

  return (
    <div
      className={clsx("HeaderIconsList", className, {
        HeaderIconsList__isHomePage: isHomePage,
      })}
    >
      <div className="HeaderIconsList-Item">
        {!isNull(cartId) && (
          <div>
            <Link
              className="HeaderIconsList-IconLink"
              to={{
                pathname: `${ERoutes.Cart}${cartId}`,
              }}
            >
              <Icon className="HeaderIconsList-Icon" type="Cart" />
              <div className="HeaderIconsList-IconDescription">
                <Typography variant={ETypographyVariant.TextB3Regular}>Корзина</Typography>
              </div>
              <div className="HeaderIconsList-CartItemsCount">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {cartItemsCountTotal}
                </Typography>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className={clsx("HeaderIconsList-Item", "HeaderIconsList-ItemDesktop")}>
        {!isEmpty(user) ? (
          <div className="HeaderIconsList-AvatarDropDown" ref={refToggleDropDown}>
            <Avatar user={user.firstName} size={46} onClick={handleToggleDropDown} />
            <DropDown className="HeaderIconsList-DropDownUser" isOpen={isDropDownOpen}>
              <ul className="HeaderIconsList-AvatarDropDown_Menu">
                <li className="HeaderIconsList-AvatarDropDown_MenuItem" onClick={handleLogout}>
                  <Icon className="HeaderIconsList-AvatarDropDown_MenuItemIcon" type="Exit" />
                  <div className="HeaderIconsList-AvatarDropDown_MenuItemText">
                    <Typography variant={ETypographyVariant.TextB3Regular}>Выйти</Typography>
                  </div>
                </li>
              </ul>
            </DropDown>
          </div>
        ) : (
          <Link className="HeaderIconsList-IconLink" to={ERoutes.Login}>
            <Icon className="HeaderIconsList-Icon" type="User" />
            <div className="HeaderIconsList-IconDescription">
              <Typography variant={ETypographyVariant.TextB3Regular}>Войти</Typography>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export function headerIconListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
