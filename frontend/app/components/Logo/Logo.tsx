import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import styles from "./Logo.css";
import { Icon } from "#app/uikit";
import { createPath } from "#app/utils";
import { ERoutes } from "#app/enums";

type TProps = {
  className?: string;
};

export const Logo: FC<TProps> = ({ className }) => {
  return (
    <Link
      className={clsx("Logo", className)}
      to={createPath({
        route: ERoutes.Root,
      })}
    >
      <Icon type={"Logo"} />
    </Link>
  );
};

export function logoLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
