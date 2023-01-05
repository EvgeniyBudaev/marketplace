import { useRef, useState } from "react";
import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Logo } from "~/components";
import { Button, ETypographyVariant, Hamburger, Sidebar, Spacer, Typography } from "~/uikit";
import { HeaderIconsList } from "./HeaderIconsList";
import styles from "./HeaderCenter.module.css";

type TProps = {
  className?: string;
  isHomePage?: boolean;
  isScroll?: boolean;
};

export const HeaderCenter: FC<TProps> = ({ className, isHomePage, isScroll }) => {
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
        HeaderCenter__isHomePage: isHomePage,
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
            <Logo isHomePage={isHomePage} />
            <Spacer />

            <HeaderIconsList className="HeaderCenter-Desktop" isHomePage={isHomePage} />
          </div>
          <div className="HeaderCenter-Mobile">
            <Button
              className={clsx("HeaderCenter-ButtonSidebar", {
                "HeaderCenter-ButtonSidebar__isHomePage": isHomePage,
              })}
              onClick={handleSidebarOpen}
            >
              <Hamburger
                className="HeaderCenter-HamburgerSidebar"
                color={isHomePage ? "white" : "black"}
                isActive={isSidebar}
                isHomePage={isHomePage}
              />
            </Button>
            <Logo className="HeaderCenter-LogoMobile" isHomePage={isHomePage} />

            <HeaderIconsList
              className="HeaderCenter-HeaderIconsListMobile"
              isHomePage={isHomePage}
            />

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
