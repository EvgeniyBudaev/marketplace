import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "#app/pages/Admin/Attributes/SelectableTable";
import type { TSelectableItem } from "#app/shared/api/attributes";
import { Icon, IconButton } from "#app/uikit";

type TProps = {
  columnHelper: ColumnHelper<TSelectableItem>;
  onEdit?: (id: number, defaultValue: string) => void;
  onDelete?: (id: number) => void;
};

type TUseGetColumns = (props: TProps) => ColumnDef<TSelectableItem>[];

export const useGetColumns: TUseGetColumns = ({
  columnHelper,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();

  return useMemo(
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
              <Icon type="Edit" onClick={() => onEdit?.(id, defaultValue)} />
            );
          },
        }),

        columnHelper.display({
          id: "delete",
          header: () =>
            t("pages.admin.attributeEdit.table.columns.info.delete"),
          cell: ({ row }) => (
            <IconButton
              typeIcon="Trash"
              onClick={() => onDelete?.(row.original.id)}
            />
          ),
        }),
      ].filter(Boolean) as ColumnDef<TSelectableItem>[],
    [columnHelper, onDelete, onEdit, t]
  );
};
