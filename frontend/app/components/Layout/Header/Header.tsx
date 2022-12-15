import { useState, useRef } from "react";
import { FC } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
//import useWindowScroll from "hooks/useWindowScroll";
import { TRANSITION } from "~/constants";
import { Overlay } from "~/uikit";
import { CatalogDropDown, catalogDropDownLinks } from "./CatalogDropDown";
import { HeaderBottom } from "./HeaderBottom";
import { HeaderCenter } from "./HeaderCenter";
import { headerBottomLinks } from "~/components/Layout/Header/HeaderBottom";
import { headerCenterLinks } from "~/components/Layout/Header/HeaderCenter";
import { headerIconListLinks } from "~/components/Layout/Header/HeaderCenter/HeaderIconsList";
import styles from "./Header.module.css";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const Header: FC<TProps> = ({ isHomePage }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const nodeRef = useRef(null);
  const headerRef = useRef(null);
  const offset = headerRef.current;
  //const isScroll = useWindowScroll({ timerLength: offset });
  const isScroll = false;

  const onCatalogToggle = () => {
    setIsCatalogOpen((prevState) => !prevState);
  };

  const onCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  return (
    <>
      <div
        className={clsx("Header-Wrapper", {
          "Header-Wrapper__isCatalogOpen": isCatalogOpen,
          "Header-Wrapper__isHomePage": isHomePage,
          "Header-Wrapper__isScroll": isScroll,
        })}
      >
        <header className="Header" ref={headerRef}>
          <HeaderCenter isHomePage={!isScroll && isHomePage} isScroll={isScroll} />
          <HeaderBottom
            isCatalogOpen={isCatalogOpen}
            isHomePage={!isScroll && isHomePage}
            onCatalogToggle={onCatalogToggle}
          />
        </header>
      </div>
      <CSSTransition
        className="CatalogDropDownWindow"
        in={isCatalogOpen}
        nodeRef={nodeRef}
        timeout={TRANSITION}
        unmountOnExit
      >
        <CatalogDropDown ref={nodeRef} isOpen={isCatalogOpen} onClose={onCatalogClose} />
      </CSSTransition>
      <Overlay timeout={TRANSITION} onClick={onCatalogClose} isActive={isCatalogOpen} />
    </>
  );
};

export function headerLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...catalogDropDownLinks(),
    ...headerBottomLinks(),
    ...headerCenterLinks(),
    ...headerIconListLinks(),
  ];
}
