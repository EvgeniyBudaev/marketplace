import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import isNull from "lodash/isNull";
import { ROUTES } from "../../../../../constants";
import classes from "./HeaderIconsList.module.scss";
import { Icon } from "../../../../../uikit";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const HeaderIconsList: React.FC<TProps> = ({
  className,
  isHomePage,
}) => {
  const [cartId, setCartId] = useState("");
  const [cartItemsCountTotal, setCartItemsCountTotal] = useState(0);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refToggleDropDown = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropDown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropDown);
    };
  });

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
    setIsDropDownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div
      className={clsx(classes.HeaderIconsList, className, {
        [classes.HeaderIconsList__isHomePage]: isHomePage,
      })}
    >
      <div className={classes.HeaderIconListItem}>
        {!isNull(cartId) && (
          <div>
            <Link
              className={classes.IconLink}
              href={{
                pathname: `${ROUTES.CART}${cartId}`,
              }}
            >
              <Icon className={classes.Icon} type="Cart" />
              <div className={classes.IconDescription}>Корзина</div>
              <div className={classes.CartItemsCount}>
                {cartItemsCountTotal}
              </div>
            </Link>
          </div>
        )}
      </div>
      <div
        className={clsx(
          classes.HeaderIconListItem,
          classes.HeaderIconListItemDesktop
        )}
      >
        <Link className={classes.IconLink} href={ROUTES.LOGIN}>
          <Icon className={classes.Icon} type="User" />
          <div className={classes.IconDescription}>Войти</div>
        </Link>
      </div>
    </div>
  );
};
