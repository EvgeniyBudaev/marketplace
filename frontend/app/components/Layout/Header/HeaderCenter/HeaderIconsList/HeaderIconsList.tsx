import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Link, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { ERoutes } from "~/enums";
import { useUser } from "~/hooks";
import { Avatar, DropDown, Icon } from "~/uikit";
import styles from "./HeaderIconsList.module.css";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const HeaderIconsList: FC<TProps> = ({ className, isHomePage }) => {
  const { user } = useUser();
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
    navigate(ERoutes.Root);
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
              <div className="HeaderIconsList-IconDescription">Корзина</div>
              <div className="HeaderIconsList-CartItemsCount">{cartItemsCountTotal}</div>
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
                  <div className="HeaderIconsList-AvatarDropDown_MenuItemText">Выйти</div>
                </li>
              </ul>
            </DropDown>
          </div>
        ) : (
          <Link className="HeaderIconsList-IconLink" to={ERoutes.Login}>
            <Icon className="HeaderIconsList-Icon" type="User" />
            <div className="HeaderIconsList-IconDescription">Войти</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export function headerIconListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
