import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { LinkButton } from "~/uikit";
import styles from "./Home.module.css";
import { WordCloud } from "~/test/WordCloud";

export const Home: FC = () => {
  const { t } = useTranslation();

  const dataClouds = [
    { value: 28, name: "Обмен" },
    { value: 14, name: "scamwarnersview" },
    { value: 14, name: "password" },
    { value: 14, name: "sex" },
    { value: 14, name: "botnet" },
    { value: 7, name: "ded" },
    { value: 14, name: "forum" },
    { value: 14, name: "spewed" },
    { value: 14, name: "spame" },
    { value: 14, name: "racco42" },
    { value: 14, name: "взломал_почту" },
    { value: 14, name: "necurs" },
    { value: 14, name: "languag" },
    { value: 14, name: "virusuka" },
    { value: 14, name: "долларов" },
    { value: 14, name: "deleted" },
    { value: 14, name: "searchers" },
    { value: 14, name: "etargete" },
    { value: 14, name: "ten" },
    { value: 14, name: "firefox" },
  ];

  return (
    <div className="Home">
      <h1>{t("home.title")}</h1>

      <div>
        <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
      </div>
      <div>
        <LinkButton href="/admin">Админка</LinkButton>
      </div>
      <div>
        <WordCloud data={dataClouds} />
      </div>
    </div>
  );
};

export function homeLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
