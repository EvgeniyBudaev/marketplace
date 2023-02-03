import { useMemo } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Attributes/AttributesTable/enums";
import { TAttribute } from "~/shared/api/attributes";

type TUseGetColumns = (columnHelper: ColumnHelper<TAttribute>) => ColumnDef<TAttribute>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => "Название",
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
        }),
      ].filter(Boolean) as ColumnDef<TAttribute>[],
    [columnHelper],
  );

  return columns;
};
