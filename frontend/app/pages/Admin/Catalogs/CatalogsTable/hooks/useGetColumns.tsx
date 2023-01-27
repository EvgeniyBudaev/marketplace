import { useMemo } from "react";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { ETableColumns } from "~/pages/Admin/Catalogs/CatalogsTable/enums";
import { TCatalog } from "~/shared/api/catalogs";
import { Tooltip } from "~/uikit";

type TUseGetColumns = (columnHelper: ColumnHelper<TCatalog>) => ColumnDef<TCatalog>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Image, {
          id: ETableColumns.Image,
          header: () => "Изображение",
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => "Название",
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => "Alias",
          cell: ({ getValue }) => {
            const value = getValue();
            return <Tooltip message={"Test"} placement={"right"}>{value}</Tooltip>;
          },
          size: 192,
        }),
      ].filter(Boolean) as ColumnDef<TCatalog>[],
    [columnHelper],
  );

  return columns;
};
