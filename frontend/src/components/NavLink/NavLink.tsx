import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import type { FC } from "react";
import { ReactElementLike } from "prop-types";

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
  const pathname = usePathname();

  let className = children.props.className || "";

  if (pathname === href) {
    className = `${className} ${activeClassName}`;
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>;
};
