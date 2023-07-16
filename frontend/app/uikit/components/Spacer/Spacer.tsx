import type {FC} from "react";
import styles from "./Spacer.css";

export const Spacer: FC = () => <div className="Spacer"/>;

export function spacerLinks() {
  return [{rel: "stylesheet", href: styles}];
}
