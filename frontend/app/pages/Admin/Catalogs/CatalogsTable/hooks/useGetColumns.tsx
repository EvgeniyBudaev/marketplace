import {useMemo} from "react";
import {ColumnDef, ColumnHelper} from "@tanstack/react-table";
import {ETableColumns} from "~/pages/Admin/Catalogs/CatalogsTable/enums";
import {TCatalogsItem} from "~/shared/api/catalogs";

type TUseGetColumns = (
    columnHelper: ColumnHelper<TCatalogsItem>,
) => ColumnDef<TCatalogsItem>[];

export const useGetColumns: TUseGetColumns = (columnHelper) => {
    const columns = useMemo(
        () =>
            [
                columnHelper.accessor(ETableColumns.Name, {
                    id: ETableColumns.Name,
                    // header: () => t('addresses.table.columns.firstOutActivityDate'),
                    // cell: ({ getValue }) => <DateTime value={getValue()} />,
                    size: 192,
                }),

            ].filter(Boolean) as ColumnDef<TCatalogsItem>[],
        [
            columnHelper,
        ],
    );

    return columns;
};