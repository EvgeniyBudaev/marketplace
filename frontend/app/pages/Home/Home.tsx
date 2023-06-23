import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {LinkButton} from "~/uikit";
import styles from "././Home.css";

export const Home: FC = () => {
  const {t} = useTranslation();

  return (
    <div className="Home">
      <h1>{t("pages.home.title")}</h1>
      <div className="Home-Block">
        <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
      </div>
      <div className="Home-Block">
        <LinkButton href="/admin">Админка</LinkButton>
      </div>
    </div>
  );
};

export function homeLinks() {
  return [{rel: "stylesheet", href: styles}];
}
