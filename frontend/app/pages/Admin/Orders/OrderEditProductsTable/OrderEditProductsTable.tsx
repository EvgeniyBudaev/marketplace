import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EPermissions } from "#app/enums";
import { useTheme, useUser } from "#app/hooks";
import { useGetColumns } from "#app/pages/Admin/Orders/OrderEditProductsTable/hooks";
import type { TTableColumn } from "#app/pages/Admin/Orders/OrderEditProductsTable/types";
import type { TOrderDetailListItem } from "#app/shared/api/orders";
import { createColumnHelper, Icon, Table as UiTable } from "#app/uikit";
import type { TTableSortingProps } from "#app/uikit";
import type { TTableRowActions } from "#app/uikit/components/Table/types";
import { checkPermission } from "#app/utils";
import styles from "./OrderEditProductsTable.css";

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
      [hiddenColumns, t]
    );

    const handleProductEdit = ({ id }: TTableColumn) => {
      console.log("id: ", id);
      // onProductEdit?.(id);
    };

    const handleProductDelete = ({ id }: TTableColumn) => {
      console.log("id: ", id);
      // onProductDelete?.(id);
    };

    const rowActions: TTableRowActions<TTableColumn> = [
      {
        icon: <Icon type="Trash" />,
        title: t("common.actions.delete"),
        onClick: handleProductDelete,
        permission: [EPermissions.Administrator],
      },
      {
        icon: <Icon type="Edit" />,
        title: t("common.actions.edit"),
        onClick: handleProductEdit,
        permission: [EPermissions.Administrator],
      },
    ].filter(({ permission }) =>
      checkPermission(user?.permissions ?? null, permission)
    );

    return (
      <div ref={ref}>
        <UiTable<TOrderDetailListItem>
          columns={columns}
          currentPage={1}
          data={content ?? []}
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
          totalItemsTitle={
            t("pages.admin.orderEdit.table.header") ?? "Total directories"
          }
        />
      </div>
    );
  }
);

TableComponent.displayName = "OrderEditItemsTableComponent";

export const OrderEditProductsTable = memo(TableComponent);

export function orderEditProductsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
