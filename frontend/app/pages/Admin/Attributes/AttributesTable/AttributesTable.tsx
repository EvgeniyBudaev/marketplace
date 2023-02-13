import { forwardRef, memo, useCallback, useState } from "react";
import { FetcherWithComponents } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { AttributeDeleteModal } from "~/pages/Admin/Attributes/AttributeDeleteModal";
import { useGetColumns } from "~/pages/Admin/Attributes/AttributesTable";
import type { TDeleteModalState } from "~/pages/Admin/Attributes/AttributesTable";
import { TAttributes, TAttribute, EAttributeAction } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import { createPath } from "~/utils";

type TProps = {
  attributes: TAttributes;
  fetcher: FetcherWithComponents<any>;
  onChangePage: ({ selected }: { selected: number }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  ({ attributes, fetcher, onChangePage }, ref) => {
    const [deleteModal, setDeleteModal] = useState<TDeleteModalState>({ isOpen: false });

    const handleClickDeleteAttribute = useCallback(
      (alias: string) => {
        setDeleteModal({
          isOpen: true,
          alias,
        });
      },
      [setDeleteModal],
    );

    const columnHelper = createColumnHelper<TAttribute>();
    const columns = useGetColumns(columnHelper, handleClickDeleteAttribute);

    const { content, countOfPage, countOfResult, currentPage, hasPrevious, hasNext } = attributes;

    const handleCloseDeleteModal = () => {
      setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    };

    const handleDelete = (alias: string) => {
      const form = new FormData();
      form.append("alias", `${alias}`);
      form.append("_method", EAttributeAction.DeleteAttribute);
      fetcher.submit(form, {
        method: EFormMethods.Delete,
        action: createPath({ route: ERoutes.Attributes, withIndex: true }),
      });
    };

    const handleSubmitDeleteModal = () => {
      if (deleteModal.alias) {
        handleDelete(deleteModal.alias);
        handleCloseDeleteModal();
      }
    };

    return (
      <div ref={ref}>
        <UiTable<TAttribute>
          columns={columns}
          currentPage={currentPage}
          data={content}
          getId={(row) => row.id}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          totalItems={countOfResult}
          totalItemsTitle={"Всего атрибутов"}
        />
        <AttributeDeleteModal
          isOpen={deleteModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={handleSubmitDeleteModal}
        />
      </div>
    );
  },
);

TableComponent.displayName = "AttributesTableComponent";

export const AttributesTable = memo(TableComponent);
