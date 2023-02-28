import type { FC, ReactNode } from "react";
import styles from "./Container.module.css";

type TProps = {
  children?: ReactNode;
};

export const Container: FC<TProps> = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export function containerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
