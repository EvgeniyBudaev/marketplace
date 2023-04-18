import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
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
  const { t } = useTranslation();
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
          header: () => t("pages.admin.attributeEdit.table.columns.info.value"),
        }),

        columnHelper.display({
          id: "edit",
          header: () => t("pages.admin.attributeEdit.table.columns.info.edit"),
          cell: ({ row }) => {
            const defaultValue = row.original.value;
            const id = row.original.id;
            return (
              <>
                <Icon type="Edit" onClick={handleModalEditOpen} />
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
          header: () => t("pages.admin.attributeEdit.table.columns.info.delete"),
          cell: ({ row }) => (
            <IconButton typeIcon="Trash" onClick={() => onDelete(row.original.id)} />
          ),
        }),
      ].filter(Boolean) as ColumnDef<TSelectableItem>[],
    [columnHelper, isOpenModalEdit, onChangeSelectableValue, onDelete, t],
  );

  return columns;
};
