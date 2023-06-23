import {memo} from "react";
import type {FC, MouseEvent} from "react";
import clsx from "clsx";
import styles from "./Hamburger.css";

enum HamburgerColor {
  BLACK = "black",
  WHITE = "white",
}

type HamburgerColorType = "black" | "white";

type TProps = {
  className?: string;
  color?: HamburgerColorType;
  isActive?: boolean;
  isHomePage?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const HamburgerComponent: FC<TProps> = ({
                                          className,
                                          color = HamburgerColor.BLACK,
                                          isActive = false,
                                          isHomePage,
                                          onClick,
                                        }) => {
  return (
    <div className={clsx("Hamburger", className)} onClick={onClick}>
      <div
        className={clsx("Hamburger-Burger", {
          "Hamburger-Burger__black": color === HamburgerColor.BLACK,
          "Hamburger-Burger__white": color === HamburgerColor.WHITE,
          "Hamburger-Burger__active": isActive,
          "Hamburger-Burger__isHomePage": isHomePage,
        })}
      />
    </div>
  );
};

export const Hamburger = memo(HamburgerComponent);

export function hamburgerLinks() {
  return [{rel: "stylesheet", href: styles}];
}
