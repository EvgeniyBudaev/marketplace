import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EPermissions } from "#app/enums";
import { useTheme, useUser } from "#app/hooks";
import { useGetColumns } from "#app/pages/Admin/Catalogs/CatalogsTable/hooks";
import type { TTableColumn } from "#app/pages/Admin/Catalogs/CatalogsTable/types";
import type { TCatalogs, TCatalog } from "#app/shared/api/catalogs";
import { createColumnHelper, Icon, Table as UiTable } from "#app/uikit";
import type { TTableSortingProps } from "#app/uikit";
import type { TTableRowActions } from "#app/uikit/components/Table/types";
import { checkPermission } from "#app/utils";
import styles from "./CatalogsTable.css";

type TProps = {
  catalogs: TCatalogs;
  fieldsSortState: TTableSortingProps;
  isLoading?: boolean;
  onCatalogDelete?: (alias: string) => void;
  onCatalogEdit?: (alias: string) => void;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      catalogs,
      fieldsSortState,
      isLoading,
      onCatalogDelete,
      onCatalogEdit,
      onChangePage,
      onChangePageSize,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TCatalog>();
    const columns = useGetColumns(columnHelper);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } =
      catalogs;

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
      [hiddenColumns, t]
    );

    const handleCatalogEdit = ({ alias }: TTableColumn) => {
      onCatalogEdit?.(alias);
    };

    const handleCatalogDelete = ({ alias }: TTableColumn) => {
      onCatalogDelete?.(alias);
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
    ].filter(({ permission }) =>
      checkPermission(user?.permissions ?? null, permission)
    );

    return (
      <div ref={ref}>
        <UiTable<TCatalog>
          columns={columns}
          currentPage={currentPage}
          data={content ?? []}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          isLoading={isLoading}
          messages={{ notFound: t("common.info.noData") }}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          rowActions={rowActions}
          settings={settingsProps}
          sorting={fieldsSortState}
          sticky={true}
          theme={theme}
          totalItems={countOfResult}
          totalItemsTitle={
            t("pages.admin.catalogs.table.header") ?? "Total directories"
          }
        />
      </div>
    );
  }
);

TableComponent.displayName = "CatalogsTableComponent";

export const CatalogsTable = memo(TableComponent);

export function catalogsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
