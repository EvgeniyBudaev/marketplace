import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "@remix-run/react";
import type {ColumnDef, ColumnHelper} from "@tanstack/react-table";
import {TableCellImage, TableHeader} from "~/components";
import {ERoutes} from "~/enums";
import {ETableColumns} from "~/pages/Admin/Catalogs/CatalogsTable";
import type {TCatalog} from "~/shared/api/catalogs";
import {DateTime, Icon, IconButton} from "~/uikit";
import {createPath} from "~/utils";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TCatalog>,
  onDelete: (alias: string) => void,
) => ColumnDef<TCatalog>[];

export const useGetColumns: TUseGetColumns = (columnHelper, onDelete) => {
  const {t} = useTranslation();

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
            return <TableCellImage image={value}/>;
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
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.CreatedAt, {
          id: ETableColumns.CreatedAt,
          header: () => (
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.dateAdded")}</TableHeader>
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
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.dateOfChange")}</TableHeader>
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
            <TableHeader>{t("pages.admin.catalogs.table.columns.info.actions")}</TableHeader>
          ),
          cell: ({row}) => (
            <div className="CatalogsTable-Actions">
              <Link
                className="CatalogsTable-ActionsEdit"
                to={createPath({
                  route: ERoutes.AdminCatalogEdit,
                  params: {alias: row.original.alias},
                })}
              >
                <Icon type="Edit"/>
              </Link>
              <IconButton typeIcon="Trash" onClick={() => onDelete(row.original.alias)}/>
            </div>
          ),
        }),
      ].filter(Boolean) as ColumnDef<TCatalog>[],
    [columnHelper, onDelete, t],
  );
};
