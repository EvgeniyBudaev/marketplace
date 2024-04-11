import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import styles from "./LinkButton.css";
import { createPath } from "#app/utils";

type TProps = {
  children?: ReactNode;
  className?: string;
  href: string;
};

const LinkButtonComponent: FC<TProps> = ({ className, children, href }) => {
  return (
    <Link
      className={clsx("LinkButton", className)}
      to={createPath({
        route: href as any,
      })}
    >
      <span>{children}</span>
    </Link>
  );
};

export const LinkButton = memo(LinkButtonComponent);

export function linkButtonLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
