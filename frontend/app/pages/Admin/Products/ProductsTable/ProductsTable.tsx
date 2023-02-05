import { forwardRef, memo } from "react";
import { useGetColumns } from "~/pages/Admin/Products/ProductsTable/hooks";
import { TProducts, TProduct } from "~/shared/api/products";
import { createColumnHelper, Table as UiTable } from "~/uikit";

type TProps = {
  products: TProducts;
  onChangePage: ({ selected }: { selected: number }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(({ products, onChangePage }, ref) => {
  const columnHelper = createColumnHelper<TProduct>();
  const columns = useGetColumns(columnHelper);

  const { content, countOfPage, countOfResult, currentPage, hasPrevious, hasNext } = products;

  return (
    <div ref={ref}>
      <UiTable<TProduct>
        columns={columns}
        currentPage={currentPage}
        data={content}
        getId={(row) => row.alias}
        onPageChange={onChangePage}
        pagesCount={countOfPage}
        totalItems={countOfResult}
        totalItemsTitle={"Всего продуктов"}
      />
    </div>
  );
});

TableComponent.displayName = "ProductsTableComponent";

export const ProductsTable = memo(TableComponent);
