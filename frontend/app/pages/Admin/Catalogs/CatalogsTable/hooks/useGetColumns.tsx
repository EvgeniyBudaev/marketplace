import { useMemo } from "react";
import { Link } from "@remix-run/react";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "~/components";
import { ERoutes } from "~/enums";
import { ETableColumns } from "~/pages/Admin/Catalogs/CatalogsTable";
import type { TCatalog } from "~/shared/api/catalogs";
import { DateTime, Icon, IconButton } from "~/uikit";
import { createPath } from "~/utils";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TCatalog>,
  onDelete: (alias: string) => void,
) => ColumnDef<TCatalog>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onDelete) => {
  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Image, {
          id: ETableColumns.Image,
          header: () => <TableHeader>Изображение</TableHeader>,
          size: 192,
        }),

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
          header: () => <TableHeader>Действия</TableHeader>,
          cell: ({ row }) => (
            <div className="CatalogsTable-Actions">
              <Link
                className="CatalogsTable-ActionsEdit"
                to={createPath({
                  route: ERoutes.AdminCatalogEdit,
                  params: { alias: row.original.alias },
                })}
              >
                <Icon type="Edit" />
              </Link>
              <IconButton typeIcon="Trash" onClick={() => onDelete(row.original.alias)} />
            </div>
          ),
        }),
      ].filter(Boolean) as ColumnDef<TCatalog>[],
    [columnHelper, onDelete],
  );
};
