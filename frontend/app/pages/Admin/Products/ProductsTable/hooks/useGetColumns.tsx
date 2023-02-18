import { useMemo } from "react";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "~/components";
import { ETableColumns } from "~/pages/Admin/Products/ProductsTable/enums";
import type { TProduct } from "~/shared/api/products";
import { DateTime, IconButton } from "~/uikit";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TProduct>,
  onDelete: (alias: string) => void,
) => ColumnDef<TProduct>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onDelete) => {
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => <TableHeader>Название</TableHeader>,
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => <TableHeader>Alias</TableHeader>,
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => <TableHeader>Дата добавления</TableHeader>,
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.ModifyDate, {
          id: ETableColumns.ModifyDate,
          header: () => <TableHeader>Дата изменения</TableHeader>,
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          size: 192,
        }),

        columnHelper.display({
          id: "actions",
          header: () => "Действия",
          cell: ({ row }) => (
            <IconButton typeIcon={"Trash"} onClick={() => onDelete(row.original.alias)} />
          ),
        }),
      ].filter(Boolean) as ColumnDef<TProduct>[],
    [columnHelper, onDelete],
  );

  return columns;
};
