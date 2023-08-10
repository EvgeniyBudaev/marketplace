import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "~/components";
import { ETableColumns } from "~/pages/Admin/Orders/OrdersTable";
import type { TOrderListItem } from "~/shared/api/orders";
import { DateTime } from "~/uikit";

type TUseGetColumns = (columnHelper: ColumnHelper<TOrderListItem>) => ColumnDef<TOrderListItem>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Id, {
          id: ETableColumns.Id,
          header: () => <TableHeader>{t("pages.admin.orders.table.columns.info.id")}</TableHeader>,
        }),

        columnHelper.accessor(ETableColumns.Status, {
          id: ETableColumns.Status,
          header: () => (
            <TableHeader>{t("pages.admin.orders.table.columns.info.status")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.OrderAmount, {
          id: ETableColumns.OrderAmount,
          header: () => (
            <TableHeader>{t("pages.admin.orders.table.columns.info.orderAmount")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.RecipientEmail, {
          id: ETableColumns.RecipientEmail,
          header: () => (
            <TableHeader>{t("pages.admin.orders.table.columns.info.recipientEmail")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => (
            <TableHeader>{t("pages.admin.orders.table.columns.info.dateAdded")}</TableHeader>
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
            <TableHeader>{t("pages.admin.orders.table.columns.info.dateOfChange")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value} />;
          },
          minSize: 192,
        }),
      ].filter(Boolean) as ColumnDef<TOrderListItem>[],
    [columnHelper, t],
  );
};
