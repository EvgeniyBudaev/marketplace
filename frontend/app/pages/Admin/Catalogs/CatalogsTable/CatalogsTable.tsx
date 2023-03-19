import { forwardRef, memo, useMemo, useState } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "~/components/modal";
import { useTheme } from "~/hooks";
import { useGetColumns } from "~/pages/Admin/Catalogs/CatalogsTable/hooks";
import type { TCatalogs, TCatalog } from "~/shared/api/catalogs";
import type { TTableSortingProps } from "~/uikit";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import styles from "./CatalogsTable.module.css";

type TProps = {
  catalogs: TCatalogs;
  fetcher: FetcherWithComponents<any>;
  fieldsSortState: TTableSortingProps;
  isOpenDeleteModal: boolean;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
  onClickDeleteIcon: (alias: string) => void;
  onCloseModal: () => void;
  onSubmitDelete: () => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      catalogs,
      fetcher,
      fieldsSortState,
      isOpenDeleteModal,
      onChangePage,
      onChangePageSize,
      onCloseModal,
      onClickDeleteIcon,
      onSubmitDelete,
    },
    ref,
  ) => {
    const columnHelper = createColumnHelper<TCatalog>();
    const columns = useGetColumns(columnHelper, onClickDeleteIcon);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } = catalogs;

    const settingsProps = useMemo(
      () => ({
        options: {
          hiddenColumns,
          setHiddenColumns,
          optionsChangeText: "Показать",
          optionsFieldHeader: "Поля таблицы",
          optionsModalHeader: "Настройка таблицы",
          optionsSorting: {
            ascText: "Сортировать по возрастанию",
            defaultText: "По умолчанию",
            descText: "Сортировать по убыванию",
            hideColumnText: "Скрыть столбец",
          },
        },
      }),
      [hiddenColumns, setHiddenColumns],
    );

    return (
      <div ref={ref}>
        <UiTable<TCatalog>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          settings={settingsProps}
          sorting={fieldsSortState}
          theme={theme}
          totalItems={countOfResult}
          totalItemsTitle={"Всего каталогов"}
        />
        <ModalDelete isOpen={isOpenDeleteModal} onClose={onCloseModal} onSubmit={onSubmitDelete} />
      </div>
    );
  },
);

TableComponent.displayName = "CatalogsTableComponent";

export const CatalogsTable = memo(TableComponent);

export function catalogsTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
