import type { FC } from "react";
import { useRef, useState } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Logo } from "~/components";
import { ETheme } from "~/enums";
import { TCart } from "~/shared/api/cart";
import { Button, ETypographyVariant, Hamburger, Sidebar, Spacer, Typography } from "~/uikit";
import { HeaderIconsList } from "./HeaderIconsList";
import styles from "./HeaderCenter.module.css";

type TProps = {
  cart?: TCart;
  className?: string;
  isScroll?: boolean;
  theme: ETheme;
};

export const HeaderCenter: FC<TProps> = ({ cart, className, isScroll, theme }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const nodeRef = useRef(null);

  const handleSidebarOpen = () => {
    setIsSidebar(true);
  };

  const handleSidebarClose = () => {
    setIsSidebar(false);
  };

  return (
    <div
      className={clsx("HeaderCenter", className, {
        HeaderCenter__isScroll: isScroll,
      })}
    >
      <div className="HeaderCenter-Container">
        <div className="HeaderCenter-Inner">
          <div className="HeaderCenter-InnerDesktop">
            <div>
              <Link className="HeaderCenter-Text" to={"tel:+79957776655"}>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  +7 (995) 777-66-55
                </Typography>
              </Link>
            </div>
            <Spacer />
            <Logo />
            <Spacer />

            <HeaderIconsList className="HeaderCenter-Desktop" />
          </div>
          <div className="HeaderCenter-Mobile">
            <Button className="HeaderCenter-ButtonSidebar" onClick={handleSidebarOpen}>
              <Hamburger
                className="HeaderCenter-HamburgerSidebar"
                color={false ? "white" : "black"}
                isActive={isSidebar}
              />
            </Button>
            <Logo className="HeaderCenter-LogoMobile" />

            <HeaderIconsList cart={cart} />

            <Sidebar ref={nodeRef} isActive={isSidebar} onClose={handleSidebarClose}>
              {/* <SidebarMobile onClose={handleSidebarClose} /> */}
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};

export function headerCenterLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
