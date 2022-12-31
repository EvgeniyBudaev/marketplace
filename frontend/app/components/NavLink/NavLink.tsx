import { cloneElement } from "react";
import type { FC } from "react";
import { Link, useLocation } from "@remix-run/react";
import type { ReactElementLike } from "prop-types";

type TProps = {
  activeClassName?: string;
  href: string;
  children: ReactElementLike;
};

export const NavLink: FC<TProps> = ({ activeClassName = "isActive", href, children }) => {
  const location = useLocation();

  let className = children.props.className || "";

  if (location.pathname === href) {
    className = `${className} ${activeClassName}`;
  }

  return <Link to={href}>{cloneElement(children, { className })}</Link>;
};
