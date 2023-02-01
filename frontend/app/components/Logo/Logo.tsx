import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import styles from "./Logo.module.css";
import { Icon } from "~/uikit";

type TProps = {
  className?: string;
};

export const Logo: FC<TProps> = ({ className }) => {
  return (
    <Link className={clsx("Logo", className)} to={"/"}>
      <Icon type={"Logo"} />
    </Link>
  );
};

export function logoLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
