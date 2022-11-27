import Link from "next/link";
import React, { memo, ReactNode } from "react";
import clsx from "clsx";
import classes from "./LinkButton.module.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
  href: string;
};

const LinkButtonComponent: React.FC<TProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <Link className={clsx(classes.LinkButton, className)} href={href}>
      <span>{children}</span>
    </Link>
  );
};

export const LinkButton = memo(LinkButtonComponent);
