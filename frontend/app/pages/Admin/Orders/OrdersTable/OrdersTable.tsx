import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EPermissions } from "#app/enums";
import { useTheme, useUser } from "#app/hooks";
import { useGetColumns } from "#app/pages/Admin/Orders/OrdersTable/hooks";
import type {
  TTableColumn,
  TTableOrderListItem,
} from "#app/pages/Admin/Orders/OrdersTable/types";
import { mapOrderListToTable } from "#app/pages/Admin/Orders/OrdersTable/utils";
import type { TOrderList } from "#app/shared/api/orders";
import { createColumnHelper, Icon, Table as UiTable } from "#app/uikit";
import type { TTableSortingProps } from "#app/uikit";
import type { TTableRowActions } from "#app/uikit/components/Table/types";
import { checkPermission } from "#app/utils";
import styles from "./OrdersTable.css";

type TProps = {
  fieldsSortState: TTableSortingProps;
  isLoading?: boolean;
  onOrderDelete?: (id: number) => void;
  onOrderEdit?: (id: number) => void;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  orders: TOrderList;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      fieldsSortState,
      isLoading,
      onOrderDelete,
      onOrderEdit,
      onChangePage,
      onChangePageSize,
      orders,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TTableOrderListItem>();
    const columns = useGetColumns(columnHelper);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } =
      orders;
    const contentToTable = mapOrderListToTable(content);

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

    const handleOrderEdit = ({ id }: TTableColumn) => {
      onOrderEdit?.(id);
    };

    const handleOrderDelete = ({ id }: TTableColumn) => {
      onOrderDelete?.(id);
    };

    const rowActions: TTableRowActions<TTableColumn> = [
      {
        icon: <Icon type="Trash" />,
        title: t("common.actions.delete"),
        onClick: handleOrderDelete,
        permission: [EPermissions.Administrator],
      },
      {
        icon: <Icon type="Edit" />,
        title: t("common.actions.edit"),
        onClick: handleOrderEdit,
        permission: [EPermissions.Administrator],
      },
    ].filter(({ permission }) =>
      checkPermission(user?.permissions ?? null, permission)
    );

    return (
      <div ref={ref}>
        <UiTable<TTableOrderListItem>
          columns={columns}
          currentPage={currentPage}
          data={contentToTable ?? []}
          defaultPageSize={pageSize}
          getId={(row) => row.id}
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
            t("pages.admin.orders.table.header") ?? "Total directories"
          }
        />
      </div>
    );
  }
);

TableComponent.displayName = "OrdersTableComponent";

export const OrdersTable = memo(TableComponent);

export function ordersTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
