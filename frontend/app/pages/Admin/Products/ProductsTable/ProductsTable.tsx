import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EPermissions } from "~/enums";
import { useTheme, useUser } from "~/hooks";
import type { TTableColumn } from "~/pages/Admin/Products/ProductsTable/types";
import { useGetColumns } from "~/pages/Admin/Products/ProductsTable/hooks";
import type { TProducts, TProduct } from "~/shared/api/products";
import { createColumnHelper, Icon, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import type { TTableRowActions } from "~/uikit/components/Table/types";
import { checkPermission } from "~/utils";
import styles from "./ProductsTable.css";

type TProps = {
  fieldsSortState: TTableSortingProps;
  isLoading?: boolean;
  products: TProducts;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  onProductDelete?: (alias: string) => void;
  onProductEdit?: (alias: string) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      fieldsSortState,
      isLoading,
      products,
      onChangePage,
      onChangePageSize,
      onProductDelete,
      onProductEdit,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TProduct>();
    const columns = useGetColumns(columnHelper);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } = products;

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

    const handleProductEdit = ({ alias }: TTableColumn) => {
      onProductEdit?.(alias);
    };

    const handleProductDelete = ({ alias }: TTableColumn) => {
      onProductDelete?.(alias);
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
    ].filter(({ permission }) => checkPermission(user?.permissions ?? null, permission));

    return (
      <div ref={ref}>
        <UiTable<TProduct>
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
          totalItemsTitle={t("pages.admin.products.table.header") ?? "Total products"}
        />
      </div>
    );
  },
);

TableComponent.displayName = "ProductsTableComponent";

export const ProductsTable = memo(TableComponent);

export function productsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
