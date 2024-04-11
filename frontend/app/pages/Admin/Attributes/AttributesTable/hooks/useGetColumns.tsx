import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { TableHeader } from "#app/components";
import { ETableColumns } from "#app/pages/Admin/Attributes/AttributesTable/enums";
import type { TAttribute } from "#app/shared/api/attributes";

type TUseGetColumns = (
  columnHelper: ColumnHelper<TAttribute>
) => ColumnDef<TAttribute>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      [
        columnHelper.accessor(ETableColumns.Name, {
          id: ETableColumns.Name,
          header: () => (
            <TableHeader>
              {t("pages.admin.attributes.table.columns.info.name")}
            </TableHeader>
          ),
          minSize: 192,
        }),

        columnHelper.accessor(ETableColumns.Alias, {
          id: ETableColumns.Alias,
          header: () => (
            <TableHeader>
              {t("pages.admin.attributes.table.columns.info.alias")}
            </TableHeader>
          ),
          minSize: 192,
        }),
      ].filter(Boolean) as ColumnDef<TAttribute>[],
    [columnHelper, t]
  );
};
