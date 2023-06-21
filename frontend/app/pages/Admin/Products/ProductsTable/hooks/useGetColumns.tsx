import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "@remix-run/react";
import type {ColumnDef, ColumnHelper} from "@tanstack/react-table";
import {TableHeader} from "~/components";
import {ERoutes} from "~/enums";
import {ETableColumns} from "~/pages/Admin/Products/ProductsTable";
import type {TProduct} from "~/shared/api/products";
import {DateTime, Icon, IconButton} from "~/uikit";
import {createPath} from "~/utils";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TProduct>,
  onDelete: (alias: string) => void,
) => ColumnDef<TProduct>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onDelete) => {
  const {t} = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => (
            <TableHeader info={t("pages.admin.products.table.columns.info.tooltip.name") ?? ""}>
              {t("pages.admin.products.table.columns.info.name")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => (
            <TableHeader info={t("pages.admin.products.table.columns.info.tooltip.alias") ?? ""}>
              {t("pages.admin.products.table.columns.info.alias")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Enabled, {
          id: ETableColumns.Enabled,
          header: () => (
            <TableHeader info={t("pages.admin.products.table.columns.info.tooltip.status") ?? ""}>
              {t("pages.admin.products.table.columns.info.status")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => (
            <TableHeader>{t("pages.admin.products.table.columns.info.dateAdded")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value}/>;
          },
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.ModifyDate, {
          id: ETableColumns.ModifyDate,
          header: () => (
            <TableHeader>{t("pages.admin.products.table.columns.info.dateOfChange")}</TableHeader>
          ),
          cell: (data) => {
            const value = data.getValue();
            return <DateTime value={value}/>;
          },
          minSize: 192,
        }),

        columnHelper.display({
          id: "actions",
          header: () => (
            <TableHeader>{t("pages.admin.products.table.columns.info.actions")}</TableHeader>
          ),
          cell: ({row}) => (
            <div className="ProductsTable-Actions">
              <Link
                className="ProductsTable-ActionsEdit"
                to={createPath({
                  route: ERoutes.AdminProductEdit,
                  params: {alias: row.original.alias},
                })}
              >
                <Icon type="Edit"/>
              </Link>
              <IconButton typeIcon="Trash" onClick={() => onDelete(row.original.alias)}/>
            </div>
          ),
        }),
      ].filter(Boolean) as ColumnDef<TProduct>[],
    [columnHelper, onDelete, t],
  );
};
