import { forwardRef, memo } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "~/components/modal";
import { useGetColumns } from "~/pages/Admin/Products/ProductsTable/hooks";
import type { TProducts, TProduct } from "~/shared/api/products";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";

type TProps = {
  fetcher: FetcherWithComponents<any>;
  fieldsSortState: TTableSortingProps;
  isOpenDeleteModal: boolean;
  products: TProducts;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  onCloseModal: () => void;
  onDelete: (alias: string) => void;
  onSubmitDelete: () => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      fetcher,
      fieldsSortState,
      isOpenDeleteModal,
      products,
      onChangePage,
      onChangePageSize,
      onCloseModal,
      onDelete,
      onSubmitDelete,
    },
    ref,
  ) => {
    const columnHelper = createColumnHelper<TProduct>();
    const columns = useGetColumns(columnHelper, onDelete);

    const { content, countOfPage, countOfResult, currentPage, pageSize } = products;

    return (
      <div ref={ref}>
        <UiTable<TProduct>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          sorting={fieldsSortState}
          totalItems={countOfResult}
          totalItemsTitle={"Всего продуктов"}
        />
        <ModalDelete isOpen={isOpenDeleteModal} onClose={onCloseModal} onSubmit={onSubmitDelete} />
      </div>
    );
  },
);

TableComponent.displayName = "ProductsTableComponent";

export const ProductsTable = memo(TableComponent);
