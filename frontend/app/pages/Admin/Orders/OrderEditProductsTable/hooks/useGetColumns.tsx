import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "~/components";
import { ETableColumns } from "~/pages/Admin/Orders/OrderEditProductsTable/enums";
import type { TOrderDetailListItem } from "~/shared/api/orders";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TOrderDetailListItem>,
) => ColumnDef<TOrderDetailListItem>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Id, {
          id: ETableColumns.Id,
          header: () => (
            <TableHeader>{t("pages.admin.orderEdit.table.columns.info.id")}</TableHeader>
          ),
        }),

        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => (
            <TableHeader>{t("pages.admin.orderEdit.table.columns.info.name")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Quantity, {
          id: ETableColumns.Quantity,
          header: () => (
            <TableHeader>{t("pages.admin.orderEdit.table.columns.info.quantity")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Price, {
          id: ETableColumns.Price,
          header: () => (
            <TableHeader>{t("pages.admin.orderEdit.table.columns.info.price")}</TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Amount, {
          id: ETableColumns.Amount,
          header: () => (
            <TableHeader>{t("pages.admin.orderEdit.table.columns.info.amount")}</TableHeader>
          ),
          minSize: 192,
        }),
      ].filter(Boolean) as ColumnDef<TOrderDetailListItem>[],
    [columnHelper, t],
  );
};
