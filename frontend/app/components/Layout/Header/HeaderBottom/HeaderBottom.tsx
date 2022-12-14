import type { FC } from "react";
import clsx from "clsx";
import { NavLink, Search } from "~/components";
import { TRANSITION } from "~/constants";
import { Button, ETypographyVariant, Hamburger, Spacer, Typography } from "~/uikit";
import styles from "./HeaderBottom.module.css";

type TProps = {
  className?: string;
  isCatalogOpen?: boolean;
  isHomePage?: boolean;
  onCatalogToggle?: () => void;
};

export const HeaderBottom: FC<TProps> = ({
  className,
  isCatalogOpen,
  isHomePage,
  onCatalogToggle,
}) => {
  return (
    <div
      className={clsx("HeaderBottom", className, {
        HeaderBottom__catalogOpen: isCatalogOpen,
        HeaderBottom__isHomePage: isHomePage,
      })}
    >
      <div className="HeaderBottom-Container">
        <div className="HeaderBottom-Desktop">
          <div className="HeaderBottom-Info">
            <div className="HeaderBottom-InfoInner">
              <div className="HeaderBottom-InfoLeft">
                <Button className="HeaderBottom-ButtonCatalog" onClick={onCatalogToggle}>
                  <Hamburger
                    className="HeaderBottom-ButtonCatalogHamburger"
                    color="white"
                    isActive={isCatalogOpen}
                  />
                  <div className="HeaderBottom-ButtonCatalogText">
                    <Typography variant={ETypographyVariant.TextB3Regular}>Каталог</Typography>
                  </div>
                </Button>
              </div>
              <Spacer />
              <Search
                className="HeaderBottom-SearchControlsDesktop"
                transition={TRANSITION}
                isHomePage={isHomePage}
              />
              <Spacer />
              <div className="HeaderBottom-InfoRight">
                <NavLink href={"/about"} activeClassName="HeaderBottom-Text__isActive">
                  <span className="HeaderBottom-Text">
                    <Typography variant={ETypographyVariant.TextB3Regular}>О компании</Typography>
                  </span>
                </NavLink>
                <NavLink href={"/delivery"} activeClassName="HeaderBottom-Text__isActive">
                  <span className="HeaderBottom-Text">
                    <Typography variant={ETypographyVariant.TextB3Regular}>
                      Доставка и оплата
                    </Typography>
                  </span>
                </NavLink>
                <NavLink href={"/contacts"} activeClassName="HeaderBottom-Text__isActive">
                  <span className="HeaderBottom-Text">
                    <Typography variant={ETypographyVariant.TextB3Regular}>Контакты</Typography>
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <Search
          className="HeaderBottom-SearchControlsMobile"
          transition={TRANSITION}
          isHomePage={isHomePage}
        />
      </div>
    </div>
  );
};

export function headerBottomLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
