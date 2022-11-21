import Link from "next/link";
import React, { ReactNode } from "react";
import clsx from "clsx";
import classes from "./LinkButton.module.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
  href: string;
};

export const LinkButton: React.FC<TProps> = ({ className, children, href }) => {
  return (
    <Link className={clsx(classes.LinkButton, className)} href={href}>
      <span>{children}</span>
    </Link>
  );
};
