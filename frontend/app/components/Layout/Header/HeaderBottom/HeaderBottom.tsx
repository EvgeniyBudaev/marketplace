import clsx from "clsx";
import type { FC } from "react";
import { Link } from "@remix-run/react";
import { Container, SearchGlobal } from "#app/components";
import { HeaderIconsList } from "#app/components/Layout/Header/HeaderIconsList";
import { TRANSITION } from "#app/constants";
import { ERoutes } from "#app/enums";
import { ETypographyVariant, Hamburger, Spacer, Typography } from "#app/uikit";
import styles from "./HeaderBottom.css";
import { createPath } from "#app/utils";

type TProps = {
  className?: string;
  isCatalogOpen?: boolean;
  onCatalogToggle?: () => void;
};

export const HeaderBottom: FC<TProps> = ({
  className,
  isCatalogOpen,
  onCatalogToggle,
}) => {
  return (
    <div
      className={clsx("HeaderBottom", className, {
        HeaderBottom__catalogOpen: isCatalogOpen,
      })}
    >
      <Container>
        <div className="HeaderBottom-Desktop">
          <div className="HeaderBottom-Info">
            <div className="HeaderBottom-InfoInner">
              <div className="HeaderBottom-InfoLeft">
                <Hamburger
                  className="HeaderBottom-Hamburger"
                  color="white"
                  isActive={isCatalogOpen}
                  onClick={onCatalogToggle}
                />
                <Link
                  className="HeaderBottom-Title"
                  to={createPath({
                    route: ERoutes.Root,
                  })}
                >
                  <Typography variant={ETypographyVariant.TextH1Medium}>
                    FamilyMart
                  </Typography>
                </Link>
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
        <SearchGlobal
          className="HeaderBottom-SearchControlsMobile"
          transition={TRANSITION}
        />
      </Container>
    </div>
  );
};

export function headerBottomLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
