import { useMemo } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { Link } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { ETableColumns } from "~/pages/Admin/Attributes/AttributesTable/enums";
import { TAttribute } from "~/shared/api/attributes";
import { Icon } from "~/uikit";
import { createPath } from "~/utils";

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

        columnHelper.accessor(ETableColumns.Id, {
          id: ETableColumns.Id,
          header: () => "Редактирование",
          cell: ({ row }) => (
            <Link
              to={createPath({
                route: ERoutes.AttributeEdit,
                params: { alias: row.original.alias },
              })}
            >
              <Icon type={"Edit"} onClick={() => {}} />
            </Link>
          ),
        }),
      ].filter(Boolean) as ColumnDef<TAttribute>[],
    [columnHelper],
  );

  return columns;
};
