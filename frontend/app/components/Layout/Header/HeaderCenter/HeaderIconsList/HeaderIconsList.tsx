import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Link, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import isNull from "lodash/isNull";
import { ROUTES } from "~/constants";
import { Icon } from "~/uikit";
import styles from "./HeaderIconsList.module.css";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const HeaderIconsList: FC<TProps> = ({ className, isHomePage }) => {
  const [cartId, setCartId] = useState("");
  const [cartItemsCountTotal, setCartItemsCountTotal] = useState(0);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refToggleDropDown = useRef<any>(null);
  const navigate = useNavigate();

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
    setIsDropDownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    navigate(ROUTES.HOME);
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
                pathname: `${ROUTES.CART}${cartId}`,
              }}
            >
              <Icon className="HeaderIconsList-Icon" type="Cart" />
              <div className="HeaderIconsList-IconDescription">Корзина</div>
              <div className="HeaderIconsList-CartItemsCount">{cartItemsCountTotal}</div>
            </Link>
          </div>
        )}
      </div>
      <div className={clsx("HeaderIconsList-Item", "HeaderIconsList-ItemDesktop")}>
        <Link className="HeaderIconsList-IconLink" to={ROUTES.LOGIN}>
          <Icon className="HeaderIconsList-Icon" type="User" />
          <div className="HeaderIconsList-IconDescription">Войти</div>
        </Link>
      </div>
    </div>
  );
};

export function headerIconListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
