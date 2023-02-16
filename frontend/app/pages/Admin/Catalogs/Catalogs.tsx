import { FormEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useFetcher, useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { DEBOUNCE_TIMEOUT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import { catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { CatalogsTable } from "~/pages/Admin/Catalogs/CatalogsTable";
import { TCatalogs } from "~/shared/api/catalogs";
import { TParams } from "~/types";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Catalogs.module.css";
import { SearchingPanel } from "~/components/search";
import isNull from "lodash/isNull";
import { EFormMethods } from "~/shared/form";
import { ERoutes } from "~/enums";
import debounce from "lodash/debounce";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = ({ catalogs }) => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const defaultSearch: string = !isNull(search) ? search : "";
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filter, setFilter] = useState<TParams>({
    page: Number(searchParams.get("page")) || DEFAULT_PAGE,
    size: Number(searchParams.get("size")) || DEFAULT_PAGE_SIZE,
  });

  const getFormData = useCallback(() => {
    const formData = new FormData();
    formData.append("page", filter.page.toString());
    formData.append("size", filter.size.toString());
    return formData;
  }, [filter]);

  useEffect(() => {
    history?.push("?" + new URLSearchParams(getFormData() as any).toString());
    submit(getFormData());
  }, [filter]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setFilter((prevState) => ({
        ...prevState,
        page: selected + 1,
      }));
    },
    [setFilter],
  );

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      setFilter((prevState) => ({
        ...prevState,
        page: DEFAULT_PAGE,
        size: pageSize,
      }));
    },
    [setFilter],
  );

  const handleSearchBlur = () => {
    setIsSearchActive(false);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
    fetcher.submit(
      { search: "" },
      {
        method: EFormMethods.Get,
        action: ERoutes.AdminProducts,
      },
    );
  };

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSearchActive(false);
    }
  };

  const debouncedFetcher = useCallback(
    debounce((query) => {
      fetcher.submit(query, {
        method: EFormMethods.Get,
        action: ERoutes.AdminProducts,
      });
    }, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedFetcher(event.currentTarget);
  };

  return (
    <section className="Catalogs">
      <div className="Catalogs-Header">
        <div>
          <h1 className="Catalogs-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>Каталоги</Typography>
          </h1>
        </div>
        <div className="Catalogs-HeaderControls">
          <SearchingPanel
            className="Catalogs-SearchingPanel"
            defaultSearch={defaultSearch}
            isActive={isSearchActive}
            onBlur={handleSearchBlur}
            onClick={handleSearchFocus}
            onFocus={handleSearchFocus}
            onKeyDown={handleSearchKeyDown}
            onSubmit={handleSearchSubmit}
          />
          <LinkButton href="/admin/catalogs/add">Добавить</LinkButton>
        </div>
      </div>
      <CatalogsTable
        catalogs={catalogs}
        onChangePage={handleChangePage}
        onChangePageSize={handleChangePageSize}
      />
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogAddLinks()];
}
