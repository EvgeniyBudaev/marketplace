import { forwardRef, memo } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "~/components/modal";
import { useGetColumns } from "~/pages/Admin/Attributes/AttributesTable";
import type { TAttributes, TAttribute } from "~/shared/api/attributes";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import styles from "./AttributesTable.module.css";

type TProps = {
  attributes: TAttributes;
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
      attributes,
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
    const columnHelper = createColumnHelper<TAttribute>();
    const columns = useGetColumns(columnHelper, onClickDeleteIcon);

    const { content, countOfPage, countOfResult, currentPage, pageSize } = attributes;

    return (
      <div ref={ref}>
        <UiTable<TAttribute>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          sorting={fieldsSortState}
          totalItems={countOfResult}
          totalItemsTitle={"Всего атрибутов"}
        />
        <ModalDelete isOpen={isOpenDeleteModal} onClose={onCloseModal} onSubmit={onSubmitDelete} />
      </div>
    );
  },
);

TableComponent.displayName = "AttributesTableComponent";

export const AttributesTable = memo(TableComponent);

export function attributesTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
