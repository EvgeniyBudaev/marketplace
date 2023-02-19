import { useEffect } from "react";
import type { FC } from "react";
import { useFetcher } from "@remix-run/react";
import { SearchingPanel } from "~/components/search";
import { ERoutes } from "~/enums";
import { useTable } from "~/hooks";
import { catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import {
  CatalogsTable,
  catalogsTableLinks,
  ETableColumns,
} from "~/pages/Admin/Catalogs/CatalogsTable";
import { ECatalogAction } from "~/shared/api/catalogs";
import type { TCatalogs } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";
import { ETypographyVariant, LinkButton, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Catalogs.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = (props) => {
  const fetcher = useFetcher();
  const catalogs = fetcher.data?.products ?? props.catalogs;

  const onDeleteCatalog = (alias: string) => {
    const form = new FormData();
    form.append("alias", `${alias}`);
    form.append("_method", ECatalogAction.DeleteCatalog);
    fetcher.submit(form, {
      method: EFormMethods.Delete,
      action: createPath({ route: ERoutes.AdminCatalogs, withIndex: true }),
    });
  };

  const {
    defaultSearch,
    deleteModal,
    isSearchActive,
    onChangePage,
    onChangeSize,
    onClickDeleteIcon,
    onCloseDeleteModal,
    onDeleteSubmit,
    onSearch,
    onSearchBlur,
    onSearchFocus,
    onSearchKeyDown,
    onSortTableByProperty,
  } = useTable(onDeleteCatalog, {
    pageOption: catalogs.currentPage,
    sizeOption: catalogs.pageSize,
  });

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.success) {
      notify.error({
        title: "Ошибка",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success]);

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
            onBlur={onSearchBlur}
            onClick={onSearchFocus}
            onFocus={onSearchFocus}
            onKeyDown={onSearchKeyDown}
            onSubmit={onSearch}
          />
          <LinkButton href="/admin/catalogs/add">Добавить</LinkButton>
        </div>
      </div>
      <CatalogsTable
        catalogs={catalogs}
        fetcher={fetcher}
        fieldsSortState={{
          columns: [
            ETableColumns.Alias,
            ETableColumns.CreatedAt,
            ETableColumns.ModifyDate,
            ETableColumns.Name,
          ],
          multiple: true,
          onChangeSorting: onSortTableByProperty,
        }}
        isOpenDeleteModal={deleteModal.isOpen}
        onChangePage={onChangePage}
        onChangePageSize={onChangeSize}
        onCloseModal={onCloseDeleteModal}
        onClickDeleteIcon={onClickDeleteIcon}
        onSubmitDelete={onDeleteSubmit}
      />
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogAddLinks(), ...catalogsTableLinks()];
}
