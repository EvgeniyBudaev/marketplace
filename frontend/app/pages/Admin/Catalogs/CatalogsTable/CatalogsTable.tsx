import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@remix-run/react";
import type { FetcherWithComponents } from "@remix-run/react";

import { ModalDelete } from "~/components/modal";
import { EPermissions, ERoutes } from "~/enums";
import { useTheme, useUser } from "~/hooks";
import { useGetColumns } from "~/pages/Admin/Catalogs/CatalogsTable/hooks";
import type { TTableColumn } from "~/pages/Admin/Catalogs/CatalogsTable/types";
import type { TCatalogs, TCatalog } from "~/shared/api/catalogs";
import { createColumnHelper, Icon, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import type { TTableRowActions } from "~/uikit/components/Table/types";
import { checkPermission, createPath } from "~/utils";
import styles from "./CatalogsTable.css";

type TProps = {
  catalogs: TCatalogs;
  fetcher: FetcherWithComponents<any>;
  fieldsSortState: TTableSortingProps;
  isOpenDeleteModal: boolean;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  onClickDeleteIcon: (alias: string) => void;
  onCloseModal: () => void;
  onSubmitDelete: () => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      catalogs,
      fetcher,
      fieldsSortState,
      isOpenDeleteModal,
      onChangePage,
      onChangePageSize,
      onCloseModal,
      onClickDeleteIcon,
      onSubmitDelete,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TCatalog>();
    const columns = useGetColumns(columnHelper, onClickDeleteIcon);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } = catalogs;

    const settingsProps = useMemo(
      () => ({
        options: {
          hiddenColumns,
          setHiddenColumns,
          optionsCancelText: t("common.actions.cancel"),
          optionsChangeText: t("common.actions.apply"),
          optionsFieldHeader: t("common.table.options.fields"),
          optionsModalHeader: t("common.table.options.modal"),
          optionsSorting: {
            ascText: t("common.table.options.sorting.asc"),
            defaultText: t("common.table.options.sorting.default"),
            descText: t("common.table.options.sorting.desc"),
            hideColumnText: t("common.table.options.sorting.hide"),
          },
        },
      }),
      [hiddenColumns, t],
    );

    const handleCatalogEdit = ({ alias }: TTableColumn) => {
      const path = createPath({
        route: ERoutes.AdminCatalogEdit,
        params: { alias },
      });
      navigate(path);
    };

    const handleCatalogDelete = ({ alias }: TTableColumn) => {
      onClickDeleteIcon(alias);
    };

    const rowActions: TTableRowActions<TTableColumn> = [
      {
        icon: <Icon type="Trash" />,
        title: t("common.actions.delete"),
        onClick: handleCatalogDelete,
        permission: [EPermissions.Administrator],
      },
      {
        icon: <Icon type="Edit" />,
        title: t("common.actions.edit"),
        onClick: handleCatalogEdit,
        permission: [EPermissions.Administrator],
      },
    ].filter(({ permission }) => checkPermission(user?.permissions ?? null, permission));

    return (
      <div ref={ref}>
        <UiTable<TCatalog>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          rowActions={rowActions}
          settings={settingsProps}
          sorting={fieldsSortState}
          theme={theme}
          totalItems={countOfResult}
          totalItemsTitle={t("pages.admin.catalogs.table.header") ?? "Total directories"}
        />
        <ModalDelete isOpen={isOpenDeleteModal} onClose={onCloseModal} onSubmit={onSubmitDelete} />
      </div>
    );
  },
);

TableComponent.displayName = "CatalogsTableComponent";

export const CatalogsTable = memo(TableComponent);

export function catalogsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
