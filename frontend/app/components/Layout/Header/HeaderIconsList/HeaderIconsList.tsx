import {useEffect, useRef, useState} from "react";
import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link, useFetcher, useNavigate} from "@remix-run/react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {ERoutes} from "~/enums";
import {useUser} from "~/hooks";
import type {TCart} from "~/shared/api/cart";
import {EFormMethods} from "~/shared/form";
import {Avatar, DropDown, ETypographyVariant, Icon, Typography} from "~/uikit";
import styles from "./HeaderIconsList.css";

type TProps = {
  cart?: TCart;
  className?: string;
};

export const HeaderIconsList: FC<TProps> = ({cart, className}) => {
  const {t} = useTranslation();
  const {user} = useUser();
  const [cartId, setCartId] = useState("");
  const [cartItemsCountTotal, setCartItemsCountTotal] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refToggleDropDown = useRef<any>(null);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNil(cart)) {
      setCartItemsCountTotal(cart.countProducts);
      setCartId(cart.uuid);
    }
  }, [cart]);

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
    <div className="HeaderIconsList">
      <div className="HeaderIconsList-Item">
        <Link
          className="HeaderIconsList-IconLink"
          to={{
            pathname: `${ERoutes.Settings}`,
          }}
        >
          <Icon className="HeaderIconsList-Icon" type="Settings"/>
          <div className="HeaderIconsList-IconDescription">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("header.settings")}
            </Typography>
          </div>
        </Link>
      </div>
      <div className="HeaderIconsList-Item">
        <div>
          <Link
            className="HeaderIconsList-IconLink"
            to={{
              pathname: `${ERoutes.Cart}${cartId}`,
            }}
          >
            <div className="HeaderIconsList-IconCart">
              <Icon className="HeaderIconsList-Icon" type="Cart"/>
              <div className="HeaderIconsList-CartItemsCount">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {cartItemsCountTotal}
                </Typography>
              </div>
            </div>
            <div className="HeaderIconsList-IconDescription">
              <Typography variant={ETypographyVariant.TextB3Regular}>{t("header.cart")}</Typography>
            </div>
          </Link>
        </div>
      </div>
      <div className={clsx("HeaderIconsList-Item", "HeaderIconsList-ItemDesktop")}>
        {!isEmpty(user) ? (
          <div className="HeaderIconsList-AvatarDropDown" ref={refToggleDropDown}>
            <Avatar user={user.firstName} size={46} onClick={handleToggleDropDown}/>
            <DropDown className="HeaderIconsList-DropDownUser" isOpen={isDropDownOpen}>
              <ul className="HeaderIconsList-AvatarDropDown_Menu">
                <li className="HeaderIconsList-AvatarDropDown_MenuItem" onClick={handleLogout}>
                  <Icon className="HeaderIconsList-AvatarDropDown_MenuItemIcon" type="Exit"/>
                  <div className="HeaderIconsList-AvatarDropDown_MenuItemText">
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      {t("header.exit")}
                    </Typography>
                  </div>
                </li>
              </ul>
            </DropDown>
          </div>
        ) : (
          <Link className="HeaderIconsList-IconLink" to={ERoutes.Login}>
            <Icon className="HeaderIconsList-Icon" type="User"/>
            <div className="HeaderIconsList-IconDescription">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("header.enter")}
              </Typography>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export function headerIconListLinks() {
  return [{rel: "stylesheet", href: styles}];
}
