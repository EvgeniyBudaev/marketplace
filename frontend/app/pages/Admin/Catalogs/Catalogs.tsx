import type { FC } from "react";
import { catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { CatalogsTable } from "~/pages/Admin/Catalogs/CatalogsTable";
import { TCatalogs } from "~/shared/api/catalogs";
import {ETypographyVariant, Icon, LinkButton, Tooltip, Typography} from "~/uikit";
import styles from "./Catalogs.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = ({ catalogs }) => {
  return (
    <section className="Catalogs">
      <div className="Catalogs-Header">
        <div>
          <h1 className="Catalogs-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>Каталоги</Typography>
          </h1>
        </div>
        <div>
          <LinkButton href="/admin/catalogs/add">Добавить</LinkButton>
        </div>
      </div>
      <div className="Catalogs-Column">
          <Tooltip message={"Test"} placement={"right"}>
              <Icon type={"Star"} />
          </Tooltip>
      </div>
      <CatalogsTable catalogs={catalogs} />
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogAddLinks()];
}
