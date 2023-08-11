import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EPermissions } from "~/enums";
import { useTheme, useUser } from "~/hooks";
import { useGetColumns } from "~/pages/Admin/Orders/OrderEditItemsTable/hooks";
import type { TTableColumn } from "~/pages/Admin/Orders/OrderEditItemsTable/types";
import type { TOrderDetailListItem } from "~/shared/api/orders";
import { createColumnHelper, Icon, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import type { TTableRowActions } from "~/uikit/components/Table/types";
import { checkPermission } from "~/utils";
import styles from "./OrderEditItemsTable.css";

type TProps = {
  fieldsSortState: TTableSortingProps;
  isLoading?: boolean;
  items: TOrderDetailListItem[];
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  ({ isLoading, items, fieldsSortState }, ref) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TOrderDetailListItem>();
    const columns = useGetColumns(columnHelper);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const content = items;

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

    const handleOrderEdit = ({ id }: TTableColumn) => {
      // onOrderEdit?.(id);
    };

    const handleOrderDelete = ({ id }: TTableColumn) => {
      // onOrderDelete?.(id);
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
    ].filter(({ permission }) => checkPermission(user?.permissions ?? null, permission));

    return (
      <div ref={ref}>
        <UiTable<TOrderDetailListItem>
          columns={columns}
          currentPage={1}
          data={content}
          // defaultPageSize={pageSize}
          getId={(row) => row.id}
          isLoading={isLoading}
          messages={{ notFound: t("common.info.noData") }}
          // onChangePageSize={onChangePageSize}
          // onPageChange={onChangePage}
          // pagesCount={countOfPage}
          rowActions={rowActions}
          settings={settingsProps}
          sorting={fieldsSortState}
          sticky={true}
          theme={theme}
          // totalItems={countOfResult}
          totalItemsTitle={t("pages.admin.orderEdit.table.header") ?? "Total directories"}
        />
      </div>
    );
  },
);

TableComponent.displayName = "OrderEditItemsTableComponent";

export const OrderEditItemsTable = memo(TableComponent);

export function orderEditItemsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
