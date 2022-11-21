import React from "react";
import clsx from "clsx";
import classes from "./Hamburger.module.scss";

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
  onClick?: (event: React.MouseEvent) => void;
};

export const Hamburger: React.FC<TProps> = ({
  className,
  color = HamburgerColor.BLACK,
  isActive = false,
  isHomePage,
  onClick,
}) => {
  return (
    <div className={clsx(classes.Hamburger, className)} onClick={onClick}>
      <div
        className={clsx(classes.Burger, {
          [classes.Burger__black]: color === HamburgerColor.BLACK,
          [classes.Burger__white]: color === HamburgerColor.WHITE,
          [classes.Burger__active]: isActive,
          [classes.Burger__isHomePage]: isHomePage,
        })}
      />
    </div>
  );
};
