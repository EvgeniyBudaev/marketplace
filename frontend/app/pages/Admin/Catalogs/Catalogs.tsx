import { useEffect } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "@remix-run/react";

import { ModalDelete } from "#app/components/modal";
import { SearchingPanel } from "#app/components/search";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "#app/constants";
import { ERoutes } from "#app/enums";
import { useTable } from "#app/hooks";
import {
  CatalogsTable,
  catalogsTableLinks,
  ETableColumns,
} from "#app/pages/Admin/Catalogs/CatalogsTable";
import { ECatalogAction } from "#app/shared/api/catalogs";
import type { TCatalogs } from "#app/shared/api/catalogs";
import { getFetcherOptions } from "#app/shared/fetcher";
import { EFormMethods } from "#app/shared/form";
import { ETypographyVariant, LinkButton, notify, Typography } from "#app/uikit";
import { createPath } from "#app/utils";
import styles from "./Catalogs.css";

type TProps = {
  catalogs: TCatalogs;
};

export const Catalogs: FC<TProps> = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { isLoading } = getFetcherOptions(fetcher);
  const catalogs: TCatalogs = fetcher.data?.catalogs ?? props.catalogs;

  const handleCatalogEdit = (alias: string) => {
    const path = createPath({
      route: ERoutes.AdminCatalogEdit,
      params: { alias },
    });
    navigate(path);
  };

  const handleCatalogDelete = (alias: string) => {
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
  } = useTable({
    onDelete: handleCatalogDelete,
    pageOption: catalogs.currentPage ?? DEFAULT_PAGE,
    sizeOption: catalogs.pageSize ?? DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (fetcher.data && fetcher.data?.success) {
      notify.success({
        title: "Выполнено",
      });
    }

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
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.admin.catalogs.title")}
            </Typography>
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
          <LinkButton
            className="Catalogs-LinkButton"
            href="/admin/catalogs/add"
          >
            {t("common.actions.add")}
          </LinkButton>
        </div>
      </div>
      <CatalogsTable
        catalogs={catalogs}
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
        isLoading={isLoading}
        onCatalogEdit={handleCatalogEdit}
        onCatalogDelete={onClickDeleteIcon}
        onChangePage={onChangePage}
        onChangePageSize={onChangeSize}
      />
      <ModalDelete
        isOpen={deleteModal.isOpen}
        onClose={onCloseDeleteModal}
        onSubmit={onDeleteSubmit}
      />
    </section>
  );
};

export function catalogsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogsTableLinks()];
}
