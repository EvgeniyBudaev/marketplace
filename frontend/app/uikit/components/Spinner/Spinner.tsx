import type { FC } from "react";
import { Icon } from "~/uikit";
import styles from "./Spinner.css";

export const Spinner: FC = () => {
  return (
    <div className="Spinner">
      <Icon type="Spinner" />
    </div>
  );
};

export function spinnerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
