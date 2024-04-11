import type { FC } from "react";
import { Icon } from "#app/uikit";
import styles from "./Spinner.css";

type TProps = {
  dataTestId?: string;
};

export const Spinner: FC<TProps> = ({ dataTestId = "uikit__spinner" }) => {
  return (
    <div className="Spinner" data-testid={dataTestId}>
      <Icon type="Spinner" />
    </div>
  );
};

export function spinnerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
