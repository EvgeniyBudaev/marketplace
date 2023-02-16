import { useMemo } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Products/ProductsTable/enums";
import { TProduct } from "~/shared/api/products";
import { TableHeader } from "~/components";

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
      ].filter(Boolean) as ColumnDef<TProduct>[],
    [columnHelper],
  );

  return columns;
};
