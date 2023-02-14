import { useMemo, useState } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Attributes/SelectableTable";
import type { TSelectableItem } from "~/shared/api/attributes";
import { Icon, IconButton } from "~/uikit";
import { SelectableEditModal } from "~/pages/Admin/Attributes/SelectableEditModal";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TSelectableItem>,
  onChangeSelectableValue: ({ id, value }: { id: number; value: string }) => void,
  onDelete: (id: number) => void,
) => ColumnDef<TSelectableItem>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onChangeSelectableValue, onDelete) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const handleModalEditOpen = () => {
    setIsOpenModalEdit(true);
  };

  const handleModalEditClose = () => {
    setIsOpenModalEdit(false);
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Id, {
          id: ETableColumns.Id,
          header: () => "Id",
        }),

        columnHelper.accessor(ETableColumns.Value, {
          id: ETableColumns.Value,
          header: () => "Value",
        }),

        columnHelper.display({
          id: "edit",
          header: () => "Редактирование",
          cell: ({ row }) => {
            const defaultValue = row.original.value;
            const id = row.original.id;
            return (
              <>
                <Icon type={"Edit"} onClick={handleModalEditOpen} />
                <SelectableEditModal
                  defaultValue={defaultValue}
                  id={id}
                  isOpenModal={isOpenModalEdit}
                  onModalClose={handleModalEditClose}
                  onSubmit={onChangeSelectableValue}
                />
              </>
            );
          },
        }),

        columnHelper.display({
          id: "delete",
          header: () => "Удаление",
          cell: ({ row }) => (
            <IconButton typeIcon={"Trash"} onClick={() => onDelete(row.original.id)} />
          ),
        }),
      ].filter(Boolean) as ColumnDef<TSelectableItem>[],
    [columnHelper],
  );

  return columns;
};
