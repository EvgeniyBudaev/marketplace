import type { FC } from "react";
import { catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { TCatalogs } from "~/shared/api/catalogs";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Catalogs.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = ({ catalogs }) => {
  return (
    <section>
      <h1 className="Catalogs-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Каталоги</Typography>
      </h1>
      <div>
        <LinkButton href="/admin/catalogs/add">Добавить</LinkButton>
      </div>
      <ul>
        {catalogs.content.map((catalog) => (
          <li key={catalog.id}>{catalog.name}</li>
        ))}
      </ul>
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogAddLinks()];
}
