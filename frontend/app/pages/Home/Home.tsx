import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { LinkButton } from "#app/uikit";
import styles from "./Home.css";

export const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="Home">
      <h1>{t("pages.home.title")}</h1>
      <div className="Home-Block">
        <LinkButton href="/catalogs/mirrors">Каталог зеркал</LinkButton>
      </div>
      <div className="Home-Block">
        <LinkButton href="/admin">Админка</LinkButton>
      </div>
    </section>
  );
};

export function homeLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
