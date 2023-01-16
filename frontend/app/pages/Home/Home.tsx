import type { FC } from "react";
import { LinkButton } from "~/uikit";
import styles from "./Home.module.css";

export const Home: FC = () => {
  return (
    <div className="Home">
      <div>
        <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
      </div>
      <div>
        <LinkButton href="/admin">Админка</LinkButton>
      </div>
    </div>
  );
};

export function homeLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
