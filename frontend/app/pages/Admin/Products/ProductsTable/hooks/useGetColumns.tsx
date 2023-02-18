import { useMemo } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Products/ProductsTable/enums";
import { TProduct } from "~/shared/api/products";
import { TableHeader } from "~/components";
import { DateTime } from "~/uikit";

type TUseGetColumns = (columnHelper: ColumnHelper<TProduct>) => ColumnDef<TProduct>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
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
            return <DateTime value={value} isUtc={false} />;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.ModifyDate, {
          id: ETableColumns.ModifyDate,
          header: () => <TableHeader>Дата изменения</TableHeader>,
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} isUtc={false} />;
          },
          size: 192,
        }),
      ].filter(Boolean) as ColumnDef<TProduct>[],
    [columnHelper],
  );

  return columns;
};
