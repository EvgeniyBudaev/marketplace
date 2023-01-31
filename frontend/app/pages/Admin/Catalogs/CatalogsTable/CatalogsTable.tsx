import { forwardRef, memo } from "react";
import { useGetColumns } from "~/pages/Admin/Catalogs/CatalogsTable/hooks";
import { TCatalogs, TCatalog } from "~/shared/api/catalogs";
import { createColumnHelper, Table as UiTable } from "~/uikit";

type TProps = {
  catalogs: TCatalogs;
  onChangePage: ({ selected }: { selected: number }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(({ catalogs, onChangePage }, ref) => {
  const columnHelper = createColumnHelper<TCatalog>();
  const columns = useGetColumns(columnHelper);

  const { content, countOfPage, countOfResult, currentPage, hasPrevious, hasNext } = catalogs;

  // const handlePageChange = ({ selected }: { selected: number }) => {
  //   console.log("selected: ", selected);
  //   //setCurrentPage(selected + 1);
  // };

  return (
    <div ref={ref}>
      <UiTable<TCatalog>
        columns={columns}
        currentPage={currentPage}
        data={content}
        getId={(row) => row.id}
        onPageChange={onChangePage}
        pagesCount={countOfPage}
        totalItems={countOfResult}
        totalItemsTitle={"Всего каталогов"}
      />
    </div>
  );
});

TableComponent.displayName = "CatalogsTableComponent";

export const CatalogsTable = memo(TableComponent);
