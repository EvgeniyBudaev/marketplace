import { forwardRef, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "#app/components/modal";
import { SelectableEditModal } from "#app/pages/Admin/Attributes/SelectableEditModal";
import type {
  TDeleteModalState,
  TEditModalState,
} from "#app/pages/Admin/Attributes/SelectableTable";
import { useGetColumns } from "#app/pages/Admin/Attributes/SelectableTable";
import type {
  TAttributeDetail,
  TSelectableItem,
} from "#app/shared/api/attributes";
import { createColumnHelper, Table as UiTable } from "#app/uikit";

type TProps = {
  attribute: TAttributeDetail;
  csrf: string;
  fetcher: FetcherWithComponents<any>;
  items: TSelectableItem[];
  onChangePage?: ({ selected }: { selected: number }) => void;
  onDeleteSelectableValue?: (id: number) => void;
  onEditSelectableValue?: ({
    id,
    value,
  }: {
    id: number;
    value: string;
  }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      attribute,
      csrf,
      fetcher,
      items,
      onChangePage,
      onDeleteSelectableValue,
      onEditSelectableValue,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [deleteModal, setDeleteModal] = useState<TDeleteModalState>({
      isOpen: false,
    });
    const [editModal, setEditModal] = useState<TEditModalState>({
      isOpen: false,
    });

    const handleClickDeleteSelectableValue = useCallback(
      (id: number) => {
        setDeleteModal({
          isOpen: true,
          id,
        });
      },
      [setDeleteModal]
    );

    const handleClickEditSelectableValue = useCallback(
      (id: number, defaultValue: string) => {
        setEditModal({
          isOpen: true,
          id,
          defaultValue,
        });
      },
      [setEditModal]
    );

    const columnHelper = createColumnHelper<TSelectableItem>();
    const columns = useGetColumns({
      columnHelper,
      onDelete: handleClickDeleteSelectableValue,
      onEdit: handleClickEditSelectableValue,
    });

    const handleCloseDeleteModal = () => {
      setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    };

    const handleCloseEditModal = () => {
      setEditModal((prev) => ({ ...prev, isOpen: false }));
    };

    const handleSubmitDeleteModal = () => {
      if (deleteModal.id) {
        onDeleteSelectableValue?.(deleteModal.id);
        handleCloseDeleteModal();
      }
    };

    const handleSubmitEditModal = ({
      id,
      value,
    }: {
      id: number;
      value: string;
    }) => {
      onEditSelectableValue?.({ id, value });
      handleCloseEditModal();
    };

    return (
      <div ref={ref}>
        <UiTable<TSelectableItem>
          columns={columns}
          currentPage={1}
          data={items}
          getId={(row) => row.id}
          onPageChange={onChangePage}
          pagesCount={1}
          totalItems={items.length}
          totalItemsTitle={
            t("pages.admin.attributeEdit.table.header") ?? "Total values"
          }
        />
        <ModalDelete
          isOpen={deleteModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={handleSubmitDeleteModal}
        />
        <SelectableEditModal
          defaultValue={editModal.defaultValue}
          id={editModal.id}
          isOpenModal={editModal.isOpen}
          onModalClose={handleCloseEditModal}
          onSubmit={handleSubmitEditModal}
        />
      </div>
    );
  }
);

TableComponent.displayName = "SelectableTableComponent";

export const SelectableTable = memo(TableComponent);
