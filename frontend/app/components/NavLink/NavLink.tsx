import { cloneElement } from "react";
import type { FC } from "react";
import { Link, useLocation } from "@remix-run/react";
import type { ReactElementLike } from "prop-types";
import { createPath } from "#app/utils";
import { ERoutes } from "#app/enums";

type TProps = {
  activeClassName?: string;
  href: string;
  children: ReactElementLike;
};

export const NavLink: FC<TProps> = ({
  activeClassName = "isActive",
  href,
  children,
}) => {
  const location = useLocation();

  let className = children.props.className || "";

  if (location.pathname === href) {
    className = `${className} ${activeClassName}`;
  }

  return (
    <Link
      to={createPath({
        route: href as any,
      })}
    >
      {cloneElement(children, { className })}
    </Link>
  );
};
