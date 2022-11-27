import Link from "next/link";
import React from "react";
import clsx from "clsx";
import LogoIcon from "./Logo.svg";
import classes from "./Logo.module.scss";

type TProps = {
  className?: string;
  isHomePage?: boolean;
};

export const Logo: React.FC<TProps> = ({ className, isHomePage }) => {
  return (
    <Link
      className={clsx(classes.Logo, className, {
        [classes.Logo__isHomePage]: isHomePage,
      })}
      href={"/"}
    >
      <LogoIcon />
    </Link>
  );
};
