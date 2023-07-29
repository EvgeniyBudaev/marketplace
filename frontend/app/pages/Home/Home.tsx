import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Chart, EChartVariants, LinkButton, WordCloud } from "~/uikit";
import styles from "././Home.css";
import { dataClouds } from "~/uikit/components/WordCloud/mockData";
import { chartData } from "~/uikit/components/Chart/mockData";

export const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="Home">
      <h1>{t("pages.home.title")}</h1>
      <div className="Home-Block">
        <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
      </div>
      <div className="Home-Block">
        <LinkButton href="/admin">Админка</LinkButton>
      </div>
      <h2>WordCloud</h2>
      <WordCloud data={dataClouds} />
      <h2>Chart</h2>
      <Chart data={chartData} variantChart={EChartVariants.Variant2} />
    </div>
  );
};

export function homeLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
