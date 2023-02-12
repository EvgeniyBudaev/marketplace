import { useMemo, useState } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Attributes/SelectableTable";
import type { TAction } from "~/pages/Admin/Attributes/SelectableTable";
import type { TSelectableItem } from "~/shared/api/attributes";
import { Icon } from "~/uikit";
import { SelectableEditModal } from "~/pages/Admin/Attributes/SelectableEditModal";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TSelectableItem & TAction>,
  onChangeSelectableValue: ({ id, value }: { id: number; value: string }) => void,
) => ColumnDef<TSelectableItem>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onChangeSelectableValue) => {
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

        columnHelper.accessor(ETableColumns.Action, {
          id: ETableColumns.Action,
          header: () => "Action",
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
      ].filter(Boolean) as ColumnDef<TSelectableItem>[],
    [columnHelper],
  );

  return columns;
};
