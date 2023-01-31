import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useSearchParams } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { CatalogsTable } from "~/pages/Admin/Catalogs/CatalogsTable";
import { TCatalogs } from "~/shared/api/catalogs";
import { ETypographyVariant, Icon, LinkButton, Tooltip, Typography } from "~/uikit";
import styles from "./Catalogs.module.css";
import { TParams } from "~/types";
import { getDefaultFilter } from "~/pages/Catalog/Filter";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = ({ catalogs }) => {
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<TParams>({});
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const getFormData = useCallback(() => {
    const formData = new FormData();

    // formData.append("sort", sorting);
    formData.append("page", page.toString());

    Object.entries(filter).forEach(([group, values]) => {
      values.forEach((value: string) => formData.append(group, value));
    });

    return formData;
  }, [page]);

  useEffect(() => {
    history?.push("?" + new URLSearchParams(getFormData() as any).toString());
  }, [page]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected);
    },
    [setPage],
  );

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
      <CatalogsTable catalogs={catalogs} onChangePage={handleChangePage} />
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogAddLinks()];
}
