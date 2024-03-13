import clsx from "clsx";
import isEmpty from "lodash/isEmpty.js";
import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import { EPermissions, ERoutes } from "~/enums";
import { useCart, useUser } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import { Avatar, DropDown, ETypographyVariant, Icon, Typography } from "~/uikit";
import { checkPermission, createPath } from "~/utils";
import styles from "./HeaderIconsList.css";

export const HeaderIconsList: FC = () => {
  const { cart } = useCart();
  const { t } = useTranslation();
  const { user } = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAdmin = checkPermission(user?.permissions ?? null, [EPermissions.Administrator]);

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

  const handleRedirectAdminPanel = () => {
    setIsDropDownOpen((prevState: boolean) => (prevState ? false : prevState));
    navigate(ERoutes.AdminPanel);
  };

  return (
    <div className="HeaderIconsList">
      <div className="HeaderIconsList-Item">
        <Link
          className="HeaderIconsList-IconLink"
          to={createPath({
            route: ERoutes.Settings,
          })}
        >
          <Icon className="HeaderIconsList-Icon" type="Settings" />
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
            to={createPath({
              route: ERoutes.Cart,
            })}
          >
            <div className="HeaderIconsList-IconCart">
              <Icon className="HeaderIconsList-Icon" type="Cart" />
              <div className="HeaderIconsList-CartItemsCount">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {cart?.countProducts}
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
          <div className="HeaderIconsList-AvatarDropDown">
            <DropDown>
              <DropDown.Button classes={{ dropDownButton: "" }}>
                <Avatar size={46} user={user.firstName} />
              </DropDown.Button>
              <DropDown.Panel classes={{ dropDownPanel: "HeaderIconsList-DropDownUser" }}>
                <ul className="HeaderIconsList-AvatarDropDown_Menu">
                  {isAdmin && (
                    <li
                      className="HeaderIconsList-AvatarDropDown_MenuItem"
                      onClick={handleRedirectAdminPanel}
                    >
                      <Icon
                        className="HeaderIconsList-AvatarDropDown_MenuItemIcon"
                        type="AdminPanel"
                      />
                      <div className="HeaderIconsList-AvatarDropDown_MenuItemText">
                        <Typography variant={ETypographyVariant.TextB3Regular}>
                          {t("header.adminPanel")}
                        </Typography>
                      </div>
                    </li>
                  )}
                  <li className="HeaderIconsList-AvatarDropDown_MenuItem" onClick={handleLogout}>
                    <Icon className="HeaderIconsList-AvatarDropDown_MenuItemIcon" type="Exit" />
                    <div className="HeaderIconsList-AvatarDropDown_MenuItemText">
                      <Typography variant={ETypographyVariant.TextB3Regular}>
                        {t("header.exit")}
                      </Typography>
                    </div>
                  </li>
                </ul>
              </DropDown.Panel>
            </DropDown>
          </div>
        ) : (
          <Link
            className="HeaderIconsList-IconLink"
            to={createPath({
              route: ERoutes.Login,
            })}
          >
            <Icon className="HeaderIconsList-Icon" type="User" />
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
  return [{ rel: "stylesheet", href: styles }];
}
