import { forwardRef, memo } from "react";
import { TAction, useGetColumns } from "~/pages/Admin/Attributes/SelectableTable";
import { TSelectableItem } from "~/shared/api/attributes";
import { createColumnHelper, Table as UiTable } from "~/uikit";

type TProps = {
  items: TSelectableItem[];
  onChangePage?: ({ selected }: { selected: number }) => void;
  onChangeSelectableValue: ({ id, value }: { id: number; value: string }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  ({ items, onChangePage, onChangeSelectableValue }, ref) => {
    const columnHelper = createColumnHelper<TSelectableItem & TAction>();
    const columns = useGetColumns(columnHelper, onChangeSelectableValue);

    return (
      <div ref={ref}>
        <UiTable<TSelectableItem>
          columns={columns}
          currentPage={1}
          data={items}
          getId={(row) => row.id}
          onPageChange={onChangePage}
          pagesCount={1}
          totalItems={items.length}
          totalItemsTitle={"Всего значений"}
        />
      </div>
    );
  },
);

TableComponent.displayName = "SelectableTableComponent";

export const SelectableTable = memo(TableComponent);
