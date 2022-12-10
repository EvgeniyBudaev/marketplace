import { useState, useRef } from "react";
import { FC } from "react";
import clsx from "clsx";
//import useWindowScroll from "hooks/useWindowScroll";
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
            onCatalogToggle={() => {}}
          />
        </header>
      </div>
    </>
  );
};

export function headerLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...headerBottomLinks(),
    ...headerCenterLinks(),
    ...headerIconListLinks(),
  ];
}
