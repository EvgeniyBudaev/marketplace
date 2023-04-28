import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "~/components/modal";
import { useTheme } from "~/hooks";
import { useGetColumns } from "~/pages/Admin/Products/ProductsTable/hooks";
import type { TProducts, TProduct } from "~/shared/api/products";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import styles from "./ProductsTable.module.css";

type TProps = {
  fetcher: FetcherWithComponents<any>;
  fieldsSortState: TTableSortingProps;
    isLoading?: boolean;
  isOpenDeleteModal: boolean;
  products: TProducts;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  onClickDeleteIcon: (alias: string) => void;
  onCloseModal: () => void;
  onSubmitDelete: () => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      fetcher,
      fieldsSortState,
        isLoading,
      isOpenDeleteModal,
      products,
      onChangePage,
      onChangePageSize,
      onCloseModal,
      onClickDeleteIcon,
      onSubmitDelete,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const columnHelper = createColumnHelper<TProduct>();
    const columns = useGetColumns(columnHelper, onClickDeleteIcon);
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

    return (
      <div ref={ref}>
        <UiTable<TProduct>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          isLoading={true}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          settings={settingsProps}
          sorting={fieldsSortState}
          theme={theme}
          totalItems={countOfResult}
          totalItemsTitle={t("pages.admin.products.table.header") ?? "Total products"}
        />
        <ModalDelete isOpen={isOpenDeleteModal} onClose={onCloseModal} onSubmit={onSubmitDelete} />
      </div>
    );
  },
);

TableComponent.displayName = "ProductsTableComponent";

export const ProductsTable = memo(TableComponent);

export function productsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
