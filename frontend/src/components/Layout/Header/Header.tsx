import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
//import useWindowScroll from "hooks/useWindowScroll";
import { HeaderCenter } from "./HeaderCenter";
import classes from "./Header.module.scss";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const Header: React.FC<TProps> = ({ isHomePage }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const nodeRef = useRef(null);
  const headerRef = useRef(null);
  const offset = headerRef.current;
  //const isScroll = useWindowScroll({ timerLength: offset });
  const isScroll = false;

  return (
    <>
      <div
        className={clsx(classes.HeaderWrapper, {
          [classes.HeaderWrapper__isCatalogOpen]: isCatalogOpen,
          [classes.HeaderWrapper__isHomePage]: isHomePage,
          [classes.HeaderWrapper__isScroll]: isScroll,
        })}
      >
        <header className={classes.Header} ref={headerRef}>
          <HeaderCenter
            isHomePage={!isScroll && isHomePage}
            isScroll={isScroll}
          />
        </header>
      </div>
    </>
  );
};
