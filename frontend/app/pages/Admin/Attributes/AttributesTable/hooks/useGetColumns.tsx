import { useMemo } from "react";
import { Link } from "@remix-run/react";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "~/components";
import { ERoutes } from "~/enums";
import { ETableColumns } from "~/pages/Admin/Attributes/AttributesTable/enums";
import type { TAttribute } from "~/shared/api/attributes";
import { Icon } from "~/uikit";
import { createPath } from "~/utils";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TAttribute>,
  onDelete: (alias: string) => void,
) => ColumnDef<TAttribute>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onDelete) => {
  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => <TableHeader>Название</TableHeader>,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => <TableHeader>Псевдоним</TableHeader>,
        }),

        columnHelper.display({
          id: "actions",
          header: () => <TableHeader>Действия</TableHeader>,
          cell: ({ row }) => (
            <div className="AttributesTable-Actions">
              <Link
                className="AttributesTable-Action AttributesTable-ActionsEdit"
                to={createPath({
                  route: ERoutes.AdminAttributeEdit,
                  params: { alias: row.original.alias },
                })}
              >
                <Icon type="Edit" />
              </Link>
              <Icon
                className="AttributesTable-Action"
                type="Trash"
                onClick={() => onDelete(row.original.alias)}
              />
            </div>
          ),
        }),
      ].filter(Boolean) as ColumnDef<TAttribute>[],
    [columnHelper, onDelete],
  );
};
