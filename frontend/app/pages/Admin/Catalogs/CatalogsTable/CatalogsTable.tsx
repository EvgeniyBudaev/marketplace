import {forwardRef, memo} from "react";
import {useGetColumns} from "~/pages/Admin/Catalogs/CatalogsTable/hooks";
import {TCatalogs, TCatalogsItem} from "~/shared/api/catalogs";
import {createColumnHelper, Table as UiTable} from "~/uikit";

type TProps = {
    catalogs: TCatalogs;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
    (
        {
            catalogs,
        },
        ref,
    ) => {
        const columnHelper = createColumnHelper<TCatalogsItem>();
        const columns = useGetColumns(columnHelper);

        const { content, currentPage, hasPrevious, hasNext } = catalogs;

        return (
            <div ref={ref}>
                <UiTable<TCatalogsItem>
                    columns={columns}
                    data={content}
                    getId={(row) => row.id}
                />
            </div>
        );
    });

TableComponent.displayName = 'CatalogsTableComponent';

export const CatalogsTable = memo(TableComponent);