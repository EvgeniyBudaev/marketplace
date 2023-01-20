import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { useGetColumns } from "~/pages/Admin/Products/ProductsTable/hooks";
import { TProducts, TProduct } from "~/shared/api/products";
import { createColumnHelper, Table as UiTable } from "~/uikit";

type TProps = {
  products: TProducts;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(({ products }, ref) => {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pages, setPages] = useState(
    new Array(page - 1).fill(undefined).concat([products.content]),
  );

  const getFormData = useCallback(() => {
    const formData = new FormData();
    formData.append("page", page.toString());
    return formData;
  }, [page]);

  useEffect(() => {
    if (pages[page - 1] === undefined) {
      submit(getFormData());
    } else {
      history?.push("?" + new URLSearchParams(getFormData() as any).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const columnHelper = createColumnHelper<TProduct>();
  const columns = useGetColumns(columnHelper);

  const { content, countOfPage, countOfResult, currentPage, hasPrevious, hasNext } = products;

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected);
    },
    [setPage],
  );

  return (
    <div ref={ref}>
      <UiTable<TProduct>
        columns={columns}
        currentPage={currentPage}
        data={content}
        getId={(row) => row.id}
        onPageChange={handlePageChange}
        pagesCount={countOfPage}
        totalItems={countOfResult}
        totalItemsTitle={"Всего продуктов"}
      />
    </div>
  );
});

TableComponent.displayName = "ProductsTableComponent";

export const ProductsTable = memo(TableComponent);
