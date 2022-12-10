import { FC } from "react";
import { LinkButton } from "~/uikit";
import styles from "./Home.module.css";

export const Home: FC = () => {
  return (
    <div className="Home">
      <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
    </div>
  );
};

export function homeLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
