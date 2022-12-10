import type { FC } from "react";
import styles from "./Spacer.module.css";

export const Spacer: FC = () => <div className="Spacer" />;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
