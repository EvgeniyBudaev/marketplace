import { forwardRef, memo } from "react";
import { useGetColumns } from "~/pages/Admin/Attributes/AttributesTable/hooks";
import { TAttributes, TAttribute } from "~/shared/api/attributes";
import { createColumnHelper, Table as UiTable } from "~/uikit";

type TProps = {
  attributes: TAttributes;
  onChangePage: ({ selected }: { selected: number }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(({ attributes, onChangePage }, ref) => {
  const columnHelper = createColumnHelper<TAttribute>();
  const columns = useGetColumns(columnHelper);

  const { content, countOfPage, countOfResult, currentPage, hasPrevious, hasNext } = attributes;

  return (
    <div ref={ref}>
      <UiTable<TAttribute>
        columns={columns}
        currentPage={currentPage}
        data={content}
        getId={(row) => row.id}
        onPageChange={onChangePage}
        pagesCount={countOfPage}
        totalItems={countOfResult}
        totalItemsTitle={"Всего атрибутов"}
      />
    </div>
  );
});

TableComponent.displayName = "AttributesTableComponent";

export const AttributesTable = memo(TableComponent);
