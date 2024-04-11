import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "#app/components";
import { ETableColumns } from "#app/pages/Admin/Products/ProductsTable";
import type { TProduct } from "#app/shared/api/products";
import { DateTime } from "#app/uikit";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TProduct>
) => ColumnDef<TProduct>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => (
            <TableHeader
              info={
                t("pages.admin.products.table.columns.info.tooltip.name") ?? ""
              }
            >
              {t("pages.admin.products.table.columns.info.name")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => (
            <TableHeader
              info={
                t("pages.admin.products.table.columns.info.tooltip.alias") ?? ""
              }
            >
              {t("pages.admin.products.table.columns.info.alias")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Enabled, {
          id: ETableColumns.Enabled,
          header: () => (
            <TableHeader
              info={
                t("pages.admin.products.table.columns.info.tooltip.status") ??
                ""
              }
            >
              {t("pages.admin.products.table.columns.info.status")}
            </TableHeader>
          ),
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => (
            <TableHeader>
              {t("pages.admin.products.table.columns.info.dateAdded")}
            </TableHeader>
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
            <TableHeader>
              {t("pages.admin.products.table.columns.info.dateOfChange")}
            </TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          minSize: 192,
        }),
      ].filter(Boolean) as ColumnDef<TProduct>[],
    [columnHelper, t]
  );
};
