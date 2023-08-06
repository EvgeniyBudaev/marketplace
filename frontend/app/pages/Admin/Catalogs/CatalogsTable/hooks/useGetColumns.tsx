import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableCellImage, TableHeader } from "~/components";
import { ETableColumns } from "~/pages/Admin/Catalogs/CatalogsTable";
import type { TCatalog } from "~/shared/api/catalogs";
import { DateTime } from "~/uikit";

type TUseGetColumns = (columnHelper: ColumnHelper<TCatalog>) => ColumnDef<TCatalog>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Image, {
          id: ETableColumns.Image,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.image")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <TableCellImage image={value} />;
          },
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.name")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.alias")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Enabled, {
          id: ETableColumns.Enabled,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.status")}</TableHeader>
          ),
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.dateAdded")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.ModifyDate, {
          id: ETableColumns.ModifyDate,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.dateOfChange")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          minSize: 192,
        }),
      ].filter(Boolean) as ColumnDef<TCatalog>[],
    [columnHelper, t],
  );
};
