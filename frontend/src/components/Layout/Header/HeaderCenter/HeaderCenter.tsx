import Link from "next/link";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "../../../Logo";
import { HeaderIconsList } from "./HeaderIconsList";
import { Button, Hamburger, Sidebar, Spacer } from "../../../../uikit";
import classes from "./HeaderCenter.module.scss";

type TProps = {
  className?: string;
  isHomePage?: boolean;
  isScroll?: boolean;
};

export const HeaderCenter: React.FC<TProps> = ({
  className,
  isHomePage,
  isScroll,
}) => {
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
      className={clsx(classes.HeaderCenter, className, {
        [classes.HeaderCenter__isHomePage]: isHomePage,
        [classes.HeaderCenter__isScroll]: isScroll,
      })}
    >
      <div className={classes.Container}>
        <div className={classes.Inner}>
          <div className={classes.InnerDesktop}>
            <div>
              <Link className={classes.Text} href={"tel:+79955053978"}>
                +7 (995) 505-39-78
              </Link>
            </div>
            <Spacer />
            <Logo isHomePage={isHomePage} />
            <Spacer />

            <HeaderIconsList
              className={classes.Desktop}
              isHomePage={isHomePage}
            />
          </div>
          <div className={classes.Mobile}>
            <Button
              className={clsx(classes.ButtonSidebar, {
                [classes.ButtonSidebar__isHomePage]: isHomePage,
              })}
              onClick={handleSidebarOpen}
            >
              <Hamburger
                className={classes.HamburgerSidebar}
                color={isHomePage ? "white" : "black"}
                isActive={isSidebar}
                isHomePage={isHomePage}
              />
            </Button>
            <Logo className={classes.LogoMobile} isHomePage={isHomePage} />

            <HeaderIconsList
              className={classes.HeaderIconsListMobile}
              isHomePage={isHomePage}
            />

            <Sidebar
              ref={nodeRef}
              isActive={isSidebar}
              onClose={handleSidebarClose}
            >
              {/* <SidebarMobile onClose={handleSidebarClose} /> */}
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
