import type { FC } from "react";
import clsx from "clsx";
import { SearchGlobal } from "~/components";
import { HeaderIconsList } from "~/components/Layout/Header/HeaderIconsList";
import { TRANSITION } from "~/constants";
import { Button, ETypographyVariant, Hamburger, Spacer, Typography } from "~/uikit";
import styles from "./HeaderBottom.module.css";

type TProps = {
  className?: string;
  isCatalogOpen?: boolean;
  onCatalogToggle?: () => void;
};

export const HeaderBottom: FC<TProps> = ({ className, isCatalogOpen, onCatalogToggle }) => {
  return (
    <div
      className={clsx("HeaderBottom", className, {
        HeaderBottom__catalogOpen: isCatalogOpen,
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
              <SearchGlobal
                className="HeaderBottom-SearchControlsDesktop"
                transition={TRANSITION}
              />
              <Spacer />
              <HeaderIconsList />
            </div>
          </div>
        </div>
        <SearchGlobal className="HeaderBottom-SearchControlsMobile" transition={TRANSITION} />
      </div>
    </div>
  );
};

export function headerBottomLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
